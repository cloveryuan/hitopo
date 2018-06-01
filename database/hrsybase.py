# -*- coding: utf-8 -*-

from hrdatabase import THrDatabase
from sqlalchemy.engine import Engine,create_engine
from sqlalchemy.orm import Session,sessionmaker
import urllib

class THrSybase(THrDatabase):
    def initHrView(self,**kwargs):
        host_ = kwargs.get("host","127.0.0.1")
        port_ = kwargs.get("port",5000)
        db_name_ = kwargs.get("dbname","hrview")
        usr_ = kwargs.get("usr","sa")
        pwd_ = kwargs.get("pwd","")
        connect_syb_ = r"{},{};Db={};Uid={};Pwd={}".format(host_,port_,db_name_,usr_,pwd_)
        connect_string_ = r"DRIVER={Sybase ASE ODBC Driver};NetworkAddress=%s;" \
                          "Charset=cp936;EnableQuotedIdentifiers=1" \
                          "" % (connect_syb_)
        params_ = urllib.quote_plus(connect_string_)
        self._hr_engine = create_engine("sybase+pyodbc:///?odbc_connect=%s" % params_,echo=False)
        self._hr_db = sessionmaker(bind=self._hr_engine)
