# -*- coding: utf-8 -*-

from hrdatabase import THrDatabase
from sqlalchemy.engine import Engine, create_engine
from sqlalchemy.orm import Session, sessionmaker

class THrPostgreSql(THrDatabase):
    def initHrView(self, **kwargs):
        host_ = kwargs.get("host", "127.0.0.1")
        port_ = kwargs.get("port", 15432)
        db_name_ = kwargs.get("dbname", "keeponline")
        usr_ = kwargs.get("usr", "root")
        pwd_ = kwargs.get("pwd", ":rt-")
        connect_string_ = "postgresql+psycopg2://{}:{}@{}:{}/{}".format(usr_, pwd_, host_, port_, db_name_)
        self._hr_engine = create_engine(connect_string_, echo=False)
        self._hr_db = sessionmaker(bind=self._hr_engine)
