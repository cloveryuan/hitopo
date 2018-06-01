# -*- coding: utf-8 -*-

import os

from basehandler import TBaseHandle
from tornado import web,gen
import logging
import time
from model.ormhitopo import TbHtFileInfo
from config.settings import TProjectConst as const
import json
from basefunction import TBaseFunction

class TGetUserImages(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        result_ = json.load(open(const.USER_IMAGES_DIR,"r+"))
        self.outputJson(result_)

class TJsonFileExist(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        file_name_ = self.get_argument("filename","")
        if 0 == TBaseFunction(self.query).isExistJsonFile(file_name_):
            result_ = ""
        else:
            result_ = file_name_
        self.outputJson(result_)

class TGetJsonFiles(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        result_ = TBaseFunction(self.query).listFiles()
        self.outputJson(result_)

class TLoadHandler(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        file_name_ = self.get_argument("filename","")
        result_ = TBaseFunction(self.query).loadFile(file_name_)
        self.outputJson(result_)

class TSaveHandler(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        record_info_ = TbHtFileInfo()
        record_info_.sfile_name = self.get_argument("filename","")
        record_info_.sjson = self.get_argument("json","")
        if 0 == len(record_info_.sfile_name):
            return dict(id=0,message=u'文件名不能为空！')
        if 0 == len(record_info_.sjson):
            return dict(id=0,message=u'内容不能为空！')
        record_info_.iscene_id = int(round(time.time() * 1000))
        record_info_.sfile_info = self.get_argument("info","")
        record_info_.slinks = self.get_argument("links","")
        record_info_.stitle = self.get_argument("title","")
        record_info_.sbody_html = self.get_argument("bodyHtml","")
        record_info_.shead_html = self.get_argument("headHtml","")
        record_info_.iauto_size = bool(self.get_argument("autoSize","False"))
        record_info_.ipan_able = bool(self.get_argument("isPannable","true"))
        record_info_.imove_able = bool(self.get_argument("isMovable","False"))
        record_info_.fzoom_min = float(self.get_argument("zoomMin","0.25"))
        record_info_.fzoom_max = float(self.get_argument("zoomMax","8"))
        record_info_.fanim_rate = float(self.get_argument("animRate","500"))
        record_info_.fdata_rate = float(self.get_argument("dataRate","1000"))
        self.db.add(record_info_)
        try:
            self.db.execute("Delete From tbhtfileinfo Where sfile_name='{}'".format(record_info_.sfile_name))
            self.db.flush()
            self.db.commit()
            result_ = {
                "id"     :record_info_.iscene_id,
                "message":u"{}文档保存成功!".format(record_info_.sfile_name)
            }
        except Exception,e:
            logging.error("save.ashx error: {}".format(e.message))
            result_ = dict(id=0,message=e.message)
        self.outputJson(result_)

class TEditorHandler(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def get(self,*args,**kwargs):
        self.render(template="editor.html")
