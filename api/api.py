import os
import flask
import flask_sqlalchemy
import flask_praetorian
import flask_cors
import flask_sqlalchemy
from sqlalchemy.dialects.postgresql import BYTEA

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()


# A generic user model that might be used by an app powered by flask-praetorian
class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.VARCHAR, unique=True, nullable=False)
    full_name = db.Column(db.VARCHAR)
    password = db.Column(db.VARCHAR, nullable=False)
    unhashed_password = db.Column(db.VARCHAR, nullable=False)
    role = db.Column(db.VARCHAR, nullable=False)
    territory = db.Column(db.VARCHAR)

    @property
    def rolenames(self):
        try:
            return self.role.split(",")
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id


class Cashier(db.Model):
    __tablename__ = "Cashier"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.VARCHAR, nullable=False)
    phone = db.Column(db.VARCHAR, nullable=False)
    store_id = db.Column(db.Integer)
    passport_series = db.Column(db.VARCHAR, nullable=False)
    passport_number = db.Column(db.VARCHAR, nullable=False)
    issue_date = db.Column(db.VARCHAR, nullable=False)
    who_issued = db.Column(db.VARCHAR, nullable=False)

class Store(db.Model):
    __tablename__ = "Store"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    store_code = db.Column(db.VARCHAR, primary_key=True, nullable=False)
    store_name = db.Column(db.VARCHAR, unique=True, nullable=False)
    VC = db.Column(db.Integer, nullable=False)
    BU = db.Column(db.VARCHAR, nullable=False)
    territory = db.Column(db.VARCHAR, nullable=False)

class Activities(db.Model):
    __tablename__ = "Activity"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR, unique=True, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)


class ActivityStoreConnections(db.Model):
    __tablename__ = "ActivityStoreConnection"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    store_id = db.Column(db.Integer, nullable=False)
    activity_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.VARCHAR, nullable=False)


class Rewards(db.Model):
    __tablename__ = "Reward"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR, nullable=False)
    status = db.Column(db.VARCHAR, nullable=False)


class CashierActivityConnections(db.Model):
    __tablename__ = "CashierActivityConnection"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cashier_id = db.Column(db.Integer, nullable=False)
    activity_id = db.Column(db.Integer, nullable=False)
    reward_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.VARCHAR, nullable=False)
    result = db.Column(db.VARCHAR, nullable=False)
    total = db.Column(db.Float, nullable=False)
    signature = db.Column(BYTEA, nullable=False)


# Initialize flask app
app = flask.Flask(__name__)
app.debug = True
app.config["SECRET_KEY"] = "some_str"
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}

# Initialize the flask-praetorian instance for the app
guard.init_app(app, User)

# Initialize a local database for the example
# app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://localhost:5432/sammy?user=postgres&password=root"
db.init_app(app)


# Set up some routes for the example
@app.route("/api/")
def home():
    ret = {"message": "some"}
    return ret, 200


@app.route("/api/get_platform", methods=["GET"])
def get_platform():
    platform = flask.request.user_agent.platform
    agent = flask.request.user_agent.string
    ret = {"platform": platform, "agent": agent}
    return ret, 200


@app.route("/api/login", methods=["POST"])
def login():
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return ret, 200


@app.route("/api/verify", methods=["POST"])
def verify():
    data = flask.request.get_json(force=True)["data"]
    activity_id = data["activity_id"]
    store_id = data["store_id"]
    cashier_id = data["cashier_id"]
    activity_id = data["activity_id"]
    sql_query = f'insert into public."ActivityStoreConnection" ("status", "activity_id", "store_id") values (\'verified\', {activity_id}, {store_id}) ON CONFLICT ("activity_id", "store_id") DO UPDATE SET "status" = EXCLUDED.status'
    result = db.engine.execute(sql_query)
    sql_query = f'insert into public."CashierActivityConnection" ("cashier_id", "activity_id", "reward_id", "status") values ({cashier_id}, {activity_id}, 1, \'verified\') ON CONFLICT ("cashier_id", "activity_id", "reward_id") DO UPDATE SET "status" = EXCLUDED.status'
    result = db.engine.execute(sql_query)
    db.session.commit()
    ret = {"status": 200}
    return ret, 200


@app.route("/api/dataurl", methods=["GET"])
def dataurl():
    dataurl = (
        db.session.query(CashierActivityConnections.signature)
        .where(CashierActivityConnections.id == 202)
        .all()[0][0]
        .decode("utf-8")
    )
    print(dataurl)
    ret = {"message": dataurl}
    return ret, 200


@app.route("/api/done", methods=["POST"])
def done():
    data = flask.request.get_json(force=True)
    connection_id = data["connection_id"]
    reward = data["reward"]
    total = data["total"]
    signature = data["signature"]
    sql_query = f'update public."CashierActivityConnection" set "status"= \'done\', "total" = {total}, "signature"=\'{signature}\' where "id"= {connection_id}'
    result = db.engine.execute(sql_query)
    db.session.commit()
    ret = {"status": 200}
    return ret, 200


@app.route("/api/reward", methods=["POST"])
def reward():
    data = flask.request.get_json(force=True)
    connection_id = data["connection_id"]
    result = data["result"]
    sql_query = f'update public."CashierActivityConnection" set "result" = {result}, "status"= \'reward\' where "id"= {connection_id}'
    result = db.engine.execute(sql_query)
    db.session.commit()
    ret = {"status": 200}
    return ret, 200


@app.route("/api/activate", methods=["POST"])
def activate():
    data = flask.request.get_json(force=True)
    store_id = data["storeId"]
    activity_id = data["actId"]

    sql_query = (
        f'insert into public."ActivityStoreConnection" ("status", "activity_id", "store_id") values '
        f"('active', {activity_id}, {store_id}) ON CONFLICT DO NOTHING"
    )
    result = db.engine.execute(sql_query)

    for cashId in data["cashId"]:
        sql_query = (
            f'insert into public."CashierActivityConnection" ("cashier_id", "activity_id", "reward_id", "status") '
            f"values ({cashId}, {activity_id}, 1, 'active') ON CONFLICT DO NOTHING"
        )
        result = db.engine.execute(sql_query)
    db.session.commit()
    ret = {"status": 200}
    return ret, 200


@app.route("/api/refresh", methods=["POST"])
def refresh():
    old_token = flask.request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access_token": new_token}
    return ret, 200


@app.route("/api/reward_list", methods=["GET"])
def get_reward_list():
    list_of_dicts = [
        {"value": elem2[0], "label": elem1[0]}
        for elem1, elem2 in zip(
            db.session.query(Rewards.name).where(Rewards.status == "active").all(),
            db.session.query(Rewards.id).where(Rewards.status == "active").all(),
        )
    ]
    resp = {"message": list_of_dicts}
    return resp, 200


@app.route("/api/activities_list", methods=["GET"])
def get_activities_list():
    list_of_dicts = [
        {"value": elem2[0], "label": elem1[0]}
        for elem1, elem2 in zip(
            db.session.query(Activities.name).all(),
            db.session.query(Activities.id).all(),
        )
    ]
    resp = {"message": list_of_dicts}
    return resp, 200


@app.route("/api/stores_list", methods=["GET"])
def get_stores_list():
    list_of_dicts = [
        {"value": elem2[0], "label": elem1[0]}
        for elem1, elem2 in zip(
            db.session.query(Store.store_name).all(), db.session.query(Store.id).all()
        )
    ]
    resp = {"message": list_of_dicts}
    return resp, 200


@app.route("/api/chashiers_list", methods=["POST"])
def get_chashiers_list():
    store_id = flask.request.get_json(force=True)["store_id"]
    list_of_dicts = [
        {"value": elem2[0], "label": elem1[0]}
        for elem1, elem2 in zip(
            db.session.query(Cashier.full_name)
            .where(Cashier.store_id == store_id)
            .all(),
            db.session.query(Cashier.id).where(Cashier.store_id == store_id).all(),
        )
    ]
    resp = {"message": list_of_dicts}
    return resp, 200


def get_by_type(data: dict, types: str):
    cashierActDict = [
        {"connection_id": elem1[0], "cashier_id": elem2[0], "activity_id": elem3[0]}
        for elem1, elem2, elem3 in zip(
            db.session.query(CashierActivityConnections.id)
            .where(CashierActivityConnections.status == types)
            .where(CashierActivityConnections.activity_id == data["id"]),
            db.session.query(CashierActivityConnections.cashier_id)
            .where(CashierActivityConnections.status == types)
            .where(CashierActivityConnections.activity_id == data["id"]),
            db.session.query(CashierActivityConnections.activity_id)
            .where(CashierActivityConnections.status == types)
            .where(CashierActivityConnections.activity_id == data["id"]),
        )
    ]
    for elem in cashierActDict:
        store_id = (
            db.session.query(Cashier.store_id)
            .where(Cashier.id == elem["cashier_id"])
            .all()[0][0]
        )
        elem["store_id"] = store_id
        elem["store_name"] = (
            db.session.query(Store.store_name).where(Store.id == store_id).all()[0][0]
        )
        elem["store_code"] = (
            db.session.query(Store.store_code).where(Store.id == store_id).all()[0][0]
        )
        elem["full_name"] = (
            db.session.query(Cashier.full_name)
            .where(Cashier.id == elem["cashier_id"])
            .all()[0][0]
        )
        elem["phone"] = (
            db.session.query(Cashier.phone)
            .where(Cashier.id == elem["cashier_id"])
            .all()[0][0]
        )
        elem["activity_name"] = (
            db.session.query(Activities.name)
            .where(Activities.id == elem["activity_id"])
            .all()[0][0]
        )
    return cashierActDict


@app.route("/api/get_activated", methods=["POST"])
def get_activated():
    data = flask.request.get_json(force=True)
    activeCards = get_by_type(data, "active")
    verifiedCards = get_by_type(data, "verified")
    verifiedCards = get_by_type(data, "verified")
    rewardCards = get_by_type(data, "reward")
    doneCards = get_by_type(data, "done")
    resp = {"message": [activeCards, verifiedCards, rewardCards, doneCards]}
    return resp, 200


@app.route("/api/protected")
@flask_praetorian.auth_required
def protected():
    return {"message": flask_praetorian.current_user().role}


@app.route("/api/add_user", methods=["POST"])
def add_user():
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    role = req.get("role", None)
    area = req.get("area", None)
    if db.session.query(User).filter_by(username=username).count() < 1:
        db.session.add(
            User(
                username=username,
                unhashed_password=password,
                password=guard.hash_password(password),
                role=role,
            )
        )
        db.session.commit()
    else:
        return 501
    return "200"

@app.route("/api/cashiers", methods=["GET"])
def get_all_cashier():
    list_of_dicts = [
        {"full_name": full_name[0], "phone": phone[0], "store_id": store_id[0], "passport_series": passport_series[0], "passport_number": passport_number[0], \
         "issue_date": issue_date[0], "who_issued": who_issued[0]}
        for full_name, phone, store_id, passport_series, passport_number, issue_date, who_issued in zip(
            db.session.query(Cashier.full_name).all(),
            db.session.query(Cashier.phone).all(),
            db.session.query(Cashier.store_id).all(),
            db.session.query(Cashier.passport_series).all(),
            db.session.query(Cashier.passport_number).all(),
            db.session.query(Cashier.issue_date).all(),
            db.session.query(Cashier.who_issued).all(),
        )
    ]
    return {'message': list_of_dicts}




@app.route("/api/stores", methods=["GET"])
def get_all_store():
    list_of_dicts = [
        {"store_code": store_code[0], "store_name": store_name[0], "VC": VC[0], "BU": BU[0], "territory": territory[0]}
        for store_code, store_name, VC, BU, territory in zip(
            db.session.query(Store.store_code).all(),
            db.session.query(Store.store_name).all(),
            db.session.query(Store.VC).all(),
            db.session.query(Store.BU).all(),
            db.session.query(Store.territory).all(),
        )
    ]
    return {'message': list_of_dicts}

@app.route("/api/users", methods=["GET"])
def get_all_users():
    list_of_dicts = [
        {"username": username[0], "full_name": full_name[0], "unhashed_password": unhashed_password[0], "role": role[0], "territory": territory[0]}
        for username, full_name, unhashed_password, role, territory in zip(
            db.session.query(User.username).all(),
            db.session.query(User.full_name).all(),
            db.session.query(User.unhashed_password).all(),
            db.session.query(User.role).all(),
            db.session.query(User.territory).all(),
        )
    ]
    return {'message': list_of_dicts}


# Run the example
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
