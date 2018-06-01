# -*- coding: utf-8 -*-

import os
import tornado
import tornado.web
import tornado.ioloop
import pyrestful.rest
import logging
import datetime

from apscheduler.schedulers.background import BackgroundScheduler
gSched = BackgroundScheduler()

from config.settings import TProjectConst as const
from database.hrsqlite import THrSqlite
from handlers.basehandler import TBaseHandle
from handlers.editorhandler import TGetUserImages,TJsonFileExist,TGetJsonFiles, \
    TLoadHandler,TSaveHandler,TEditorHandler
from handlers.runviewhandler import TRunViewHandler

gHandlers = [
    (r'/(favicon\.ico)',tornado.web.StaticFileHandler,{'path':"hitopo"}),
    (r"/hitopo/editor.aspx",TEditorHandler),
    (r'/hitopo/runview.aspx',TRunViewHandler),
    (r"/hitopo/server/getuserimage.ashx",TGetUserImages),
    (r'/hitopo/server/jsonfileExist.ashx',TJsonFileExist),
    (r'/hitopo/server/getjsonFiles.ashx',TGetJsonFiles),
    (r'/hitopo/server/load.ashx',TLoadHandler),
    (r'/hitopo/server/save.ashx',TSaveHandler),
    (r'/hitopo/server/(.*)',TBaseHandle),
    (r'/hitopo/(.*)',tornado.web.StaticFileHandler,{'path':"hitopo",'default_filename':"Editor.html"}),
]
gSettings = dict(
    template_path=os.path.join(const.ROOT_DIR,"hitopo"),
    static_path=os.path.join(const.ROOT_DIR,r"hitopo"),
    static_url_prefix=r"/hitopo/",  # default url prefix
    xsrf_cookies=False,
    login_url="/",
    autoreload=False,
    debug=const.RUN_DEBUG,
    default_handler_class=TBaseHandle)

class TRestApplication(pyrestful.rest.RestService):
    def __init__(self,rest_handlers,resource=None,handlers=None,
        default_host="",transforms=None,**settings):
        super(TRestApplication,self).__init__(rest_handlers,dict(database=THrSqlite()),gHandlers,
            default_host,transforms,settings=gSettings)
        # super(TApplication, self).__init__(rest_handlers, dict(wechat=gVars.QYWX_CLIENT), gHandlers,
        #     default_host, transforms, **gSettings)
        # todo: Have one global connection to the blog DB across all handlers
        self.db = THrSqlite().hrDb
        # tornado.web.RequestHandler @property db = self.application.db

class TApplication(tornado.web.Application):
    def __init__(self):
        super(TApplication,self).__init__(gHandlers,**gSettings)

def launchBrower():
    command_ = r"D:\ProgramFiles\360Chrome\Chrome\Application\360chrome.exe --allow-file-access-from-files "
    command_ += "http://localhost/hitopo/editor.aspx"
    # command_ += "http://localhost/hitopo/runview.aspx?filename=newfile1"
    os.system(command_)

def startMain():
    #
    THrSqlite().initHrView()
    rest_app_ = TRestApplication([])
    #
    logging.info("\nwork dir: {}.\nlisten: {}.\n ".format(const.ROOT_DIR,const.SITE_LISTEN_PORT))
    # todo: http
    rest_app_.listen(const.SITE_LISTEN_PORT)
    # todo: https
    # from tornado.httpserver import HTTPServer
    # https_server_ = HTTPServer(koApp, ssl_options={
    #     "certfile": os.path.join(os.path.abspath("."), "server.crt"),
    #     "keyfile": os.path.join(os.path.abspath("."), "server.key"),
    # })
    # https_server_.listen(SITE_PORT)
    # todo: apscheduler
    # tornado.ioloop.PeriodicCallback(callback, callback_time).start()
    delta_time_ = datetime.datetime.now() + datetime.timedelta(seconds=5)
    gSched.add_job(launchBrower,'date',run_date=delta_time_)
    gSched.start()
    # todo: start
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    from common import tlogger
    # tlogger = __import__("common.tlogger",globals(),locals(),["initializeTLogger"])
    tlogger.initializeTLogger(**{"log2file":False,"level":logging.DEBUG})
    # logging.getLogger("tornado.access").setLevel(logging.WARNING)
    logging.getLogger('apscheduler.executors').setLevel(logging.WARNING)
    logging.getLogger('apscheduler.scheduler').setLevel(logging.WARNING)
    startMain()
