# -*- coding: utf-8 -*-

from hrdatabase import THrDatabase
import urllib
from sqlalchemy.engine import Engine, create_engine
from sqlalchemy.orm import Session, sessionmaker

class THrMdb(THrDatabase):
    def initHrView(self, **kwargs):
        filepath_ = kwargs.get("filepath", "")
        if filepath_:
            params_ = urllib.quote_plus(r"DRIVER={Microsoft Access Driver (*.mdb)};DBQ=%s" % (filepath_))
            self._hr_engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % params_, encoding="utf8")
            self._hr_engine.echo = False
            self._hr_db = sessionmaker(bind=self._hr_engine)
