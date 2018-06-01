# -*- coding: utf-8 -*-

from basehandler import TBaseHandle
from basefunction import TBaseFunction
from tornado import web,gen
from common.dictwrap import TDictWrap

class TRunViewHandler(TBaseHandle):
    @web.asynchronous
    @gen.coroutine
    def get(self,*args,**kwargs):
        file_name_ = self.get_argument("filename","")
        ht_info_ = TBaseFunction(self.query).loadFile(file_name_)
        context_ = TDictWrap(pyVars=ht_info_)
        self.render(template="runview.html",context=context_,layout=False)

    @web.asynchronous
    @gen.coroutine
    def post(self,*args,**kwargs):
        super(TRunViewHandler,self).post(*args,**kwargs)
