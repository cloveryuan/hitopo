# -*- coding: utf-8 -*-
__author__ = 'admin'

import os
import yaml
import logging

from common.const import TConst

def currentDir():
    import sys
    # print 'os.getcwd():\n', \
    #     os.getcwd()
    # print u'\n当前文件的绝对路径:'
    # print 'sys.path[0]:\n', \
    #     sys.path[0]
    # print '\nos.path.dirname(os.path.abspath( __file__ )):\n', \
    #     os.path.dirname(os.path.abspath(__file__))
    # print '\nos.path.split(os.path.realpath(__file__))[0]:\n', \
    #     os.path.split(os.path.realpath(__file__))[0]
    # print '\nsys.argv[0]:', \
    #     sys.argv[0]
    # print '\nos.path.realpath( sys.argv[0] ) :\n', \
    #     os.path.realpath(sys.argv[0])
    # print '\nos.path.split( os.path.realpath( sys.argv[0] ) )[0]:\n', \
    #     os.path.split(os.path.realpath(sys.argv[0]))[0]
    # print '\nos.path.split( os.path.realpath( sys.argv[0] ) )[1]:\n', \
    #     os.path.split(os.path.realpath(sys.argv[0]))[1]
    # print '\nos.path.split(sys.argv[0]):\n', \
    #     os.path.split(sys.argv[0])
    # 获取脚本路径
    # path_ = sys.path[0]
    # 判断为脚本文件还是py2exe编译后的文件，如果是脚本文件，则返回的是脚本的目录，如果是py2exe编译后的文件，则返回的是编译后的文件路径
    # if os.path.isfile(path_):
    #     path_ = os.path.dirname(path_)
    path_ = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(path_)

try:
    path_ = os.path.dirname(__file__)
    # gYamlVars = yaml.load(file("config{}settings.yml".format(os.sep),"r"))
    gYamlVars = yaml.load(file(os.path.join(path_,"settings.yml"),"r"))
except Exception,e:
    logging.error(e.message)
if not gYamlVars:
    gYamlVars = {}

class TProjectConst(TConst):
    ROOT_DIR = currentDir()
    RUN_DEBUG = gYamlVars.get("run_debug",True)
    SITE_LISTEN_PORT = int(gYamlVars.get("listen_port","8081"))
    USER_IMAGES_DIR = "{0}{1}config{1}user-images.json".format(ROOT_DIR,os.path.sep)

if __name__ == '__main__':
    TProjectConst.RUN_DEBUG = False
