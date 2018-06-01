# -*- coding:utf-8 -*-
__author__ = 'admin'

import threading
g_lock = threading.Lock()

class TSingleObject(object):
    """
    :type __instance: TSingleObject
    :type _is_first_init: int
    """
    __instance = None

    def __init__(self, sybase=None):
        super(TSingleObject, self).__init__(sybase)

    def __new__(cls, *args, **kwargs):
        if not cls.__instance:
            try:
                g_lock.acquire()
                cls.__instance = super(TSingleObject, cls).__new__(cls, *args, **kwargs)
                cls.__instance._is_first_init = 1
            finally:
                g_lock.release()
        else:
            cls.__instance._is_first_init = 0
        return cls.__instance
