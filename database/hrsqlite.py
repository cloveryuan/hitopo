# -*- coding: utf-8 -*-

import os
from hrdatabase import THrDatabase
from sqlalchemy.engine import Engine,create_engine
from sqlalchemy.orm import Session,sessionmaker
import urllib
from config.settings import TProjectConst as const

class THrSqlite(THrDatabase):
    def initHrView(self,**kwargs):
        path_ = os.path.join(const.ROOT_DIR,"config")
        file_path_ = os.path.join(path_,kwargs.get("filepath","hitopo.db3"))
        self._hr_engine = create_engine("sqlite:///{}".format(file_path_),echo=False)
        self._hr_db = sessionmaker(bind=self._hr_engine)
