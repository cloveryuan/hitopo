# -*- coding: utf-8 -*-

import os
import json
from config.settings import TProjectConst as const
from common.sqlquery import TSqlQuery
from model.ormhitopo import TbHtFileInfo
from common.dictwrap import TDictWrap

class TBaseFunction(object):
    """
    :type _query: TSqlQuery
    """

    def __init__(self,query):
        super(TBaseFunction,self).__init__()
        self._query = query

    def dumpUserImages(path=None):
        result_ = []
        path_ = path
        if not path_:
            path_ = const.ROOT_DIR + r"\hitopo\images\user"
        for parent,dirnames,filenames in os.walk(path_):
            for file_name_ in filenames:
                result_.append(file_name_)
            break
        json.dump(result_,open(const.USER_IMAGES_DIR,"w+"),ensure_ascii=False,indent=2)

    def isExistJsonFile(self,file_name):
        # type: (str) -> int
        result_ = 0
        if 0 == len(file_name):
            return result_
        sql_ = "select count(1) as length from tbhtfileinfo " \
               "where sfile_name='{}'".format(file_name)
        records_ = self._query.query(sql_)
        if records_:
            result_ = records_[0].length
        return result_

    def loadJsonFromFile(self,file_name):
        result_ = ""
        if 0 == len(file_name):
            return result_
        sql_ = "Select sjson From tbhtfileinfo " \
               "Where sfile_name='{}'".format(file_name)
        records_ = self._query.query(sql_)
        if records_:
            info_ = records_[0]  # type: TbHtFileInfo
            result_ = str(info_.sjson)
        return result_

    def listFiles(self):
        result_ = []
        sql_ = "Select sfile_name From tbhtfileinfo "
        records_ = self._query.query(sql_)
        for info_ in records_:
            result_.append(dict(name=info_.sfile_name,time=0,size=0))
        return result_

    def loadFile(self,file_name):
        result_ = {}
        if 0 == len(file_name):
            return result_
        sql_ = "Select * From tbhtfileinfo " \
               "Where sfile_name='{}'".format(file_name)
        records_ = self._query.query(sql_)
        if records_:
            info_ = records_[0]  # type: TbHtFileInfo
            result_ = TDictWrap(
                filename=info_.sfile_name,info=info_.sfile_info,links=info_.slinks,dataRate=info_.fdata_rate,
                title=info_.stitle,zoomMin=info_.fzoom_min,bodyHtml=info_.sbody_html,headHtml=info_.shead_html,
                json=str(info_.sjson),animRate=info_.fanim_rate,zoomMax=info_.fzoom_max,id=info_.iscene_id,
                autoSize=str(bool(info_.iauto_size)),isPannable=str(bool(info_.ipan_able)),
                isMovable=str(bool(info_.imove_able))
            )
        return result_
