# -*- coding: utf-8 -*-

import logging
import json
from sqlalchemy.orm import Session
from tornado import web,gen
from tornado.httputil import HTTPServerRequest
from common.sqlquery import TSqlQuery

import tenjin
tenjin.set_template_encoding("utf-8")
from tenjin.helpers import *
# pp_ = [tenjin.JavaScriptPreprocessor(),]
# path_ = [os.path.join('templates', theme) for theme in kosetting.THEMES] + ['templates']
pp_ = []
path_ = ["hitopo"]
engine = tenjin.Engine(
    path=path_,
    cache=tenjin.MemoryCacheStorage(),
    # cache=False,
    pp=pp_,
    preprocess=True)

class TBaseHandle(web.RequestHandler):
    def initialize(self):
        self._query = TSqlQuery(self.application.db)

    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin','*')
        # self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        # self.set_header('Access-Control-Max-Age', 1000)
        # self.set_header('Access-Control-Allow-Headers', '*')
        # self.set_header('Content-type', 'application/json')

    @property
    def db(self):
        # type: () -> Session
        return self.application.db

    @property
    def query(self):
        # type: () -> TSqlQuery
        return self._query

    def engineRender(self,template,context=None,globals=None,layout=False):
        if context is None:
            context = {}
        args = dict(
            handler=self,
            request=self.request,
            current_user=self.current_user,
            xsrf_form_html=self.xsrf_form_html,
            xsrf_token=self.xsrf_token,
        )
        context.update(args)
        return engine.render(template,context,globals,layout)

    def render(self,template,context=None,globals=None,layout=False):
        self.write(self.engineRender(template,context,globals,layout))

    def outputJson(self,data):
        if data:
            result_ = json.dumps(data,ensure_ascii=False).replace("</","<\\/")
            self.set_header("Content-Type","application/json; charset=UTF-8")
        else:
            result_ = ''
        self.write(result_)

    @web.asynchronous
    @gen.coroutine
    def get(self,*args,**kwargs):
        logging.debug(u"{} get: {}".format(self.request.uri,
            json.dumps(self.request.arguments,ensure_ascii=False,indent=2)))

    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        logging.debug(u"{} post: {}".format(self.request.uri,
            json.dumps(self.request.arguments,ensure_ascii=False,indent=2)))
