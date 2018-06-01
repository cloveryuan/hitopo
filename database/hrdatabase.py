# -*- coding: utf-8 -*-

from common.singleton import TSingleObject
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from abc import ABCMeta,abstractmethod

class THrDatabase(TSingleObject):
    __metaclass__ = ABCMeta

    def __init__(self):
        if self._is_first_init:
            super(THrDatabase,self).__init__()
            self._hr_engine = None
            self._hr_db = None

    @abstractmethod
    def initHrView(self,**kwargs):
        pass

    @property
    def hrEngine(self):
        """
        :rtype: Engine
        """
        return self._hr_engine

    @property
    def hrDb(self):
        """
        :rtype: Session
        """
        return self._hr_db()
