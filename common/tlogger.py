# -*- coding: utf-8 -*-

import sys
import os
import logging
import datetime

class TLogger:
    def __init__(self, **kwargs):
        self._manage_filenames = {}
        self._log_format = kwargs.get("format", "%(asctime)s - %(pathname)s,%(lineno)d - %(levelname)s - %(message)s")
        # datefmt "%Y-%m-%d %H:%M:%S,%f"
        level_ = kwargs.get("level", logging.INFO)
        logging.basicConfig(level=level_, format=self._log_format)
        self._log2file = kwargs.get("log2file", False)
        if self._log2file:
            # self._record_date = datetime.datetime.now()
            self._record_date = datetime.date.today()
            self._log_basepath = kwargs.get("basepath", "his")
            self._log_filename = kwargs.get("filename", self.getHisFileName(self._record_date))
            self.addFileHandle(self._log_filename)

    def getHisFileName(self, his_date):
        main_model_basename_ = os.path.basename(sys.argv[0])
        model_name_ = main_model_basename_.split(".")[0]
        his_filename_ = "{}.{}.log".format(his_date.strftime("%Y%m%d"), model_name_)
        if self._log_basepath:
            his_filename_ = self._log_basepath + os.path.sep + his_filename_
        return his_filename_

    def fixFilePath(self, filename):
        file_path_ = os.path.dirname(os.path.realpath(filename))
        if not os.path.exists(file_path_):
            os.makedirs(file_path_)

    def addFileHandle(self, filename):
        if not filename:
            return
        if not (filename in self._manage_filenames.keys()):
            self.fixFilePath(filename)
            file_handle_ = logging.FileHandler(filename, encoding="utf-8")
            file_handle_.setLevel(logging.INFO)
            file_handle_.setFormatter(logging.Formatter(self._log_format))
            logging.root.addHandler(file_handle_)
            self._manage_filenames[filename] = file_handle_

    def removeFileHandle(self, filename):
        if not filename:
            return
        if (filename in self._manage_filenames.keys()):
            file_handle_ = self._manage_filenames[filename]
            logging.root.removeHandler(file_handle_)
            del self._manage_filenames[filename]

    def shouldRollover(self):
        current_date_ = datetime.date.today()
        diff_days_ = (current_date_ - self._record_date).days
        if diff_days_ > 0:
            self._record_date = current_date_
            if self._log2file:
                self.removeFileHandle(self._log_filename)
                self._log_filename = self.getHisFileName(self._record_date)
                self.addFileHandle(self._log_filename)
            return 1
        else:
            return 0

gLog = None

def initializeTLogger(**kwargs):
    """
    初始化日志管理
    :param kwargs: dict
    :param Boolean log2file: 日志是否存档
    :param str basepath: 目录
    :param str filename: 文件名
    :return:
    """
    global gLog
    if None == gLog:
        gLog = TLogger(**kwargs)
    logging.info("sys version: {}".format(sys.version))
    if sys.version < '3':
        reload(sys)
        sys.setdefaultencoding("utf-8")

def isRollover(**kwargs):
    global gLog
    if None == gLog:
        gLog = TLogger(**kwargs)
        return -1
    return gLog.shouldRollover()
