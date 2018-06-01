# -*- coding:utf-8 -*-
__author__ = 'admin'

import sys

class TMetaConst(type):
    def __getattr__(cls,key):
        return cls[key]

    def __setattr__(cls,key,value):
        raise TypeError("constant variable %s can't be reassigned!" % key)

class TConst(object):
    __metaclass__ = TMetaConst

    def __getattr__(self,name):
        return self[name]

    def __setattr__(self,name,value):
        raise TypeError("constant variable %s can't be reassigned!" % name)

#
# class _TConst(object):
#     class TConstError(TypeError):
#         pass
#
#     def __setattr__(self,name,value):
#         if self.__dict__.has_key(name):
#             raise self.TConstError,"Can't rebind const(%s)" % name
#         else:
#             self.__dict__[name] = value
#
#     def __getattr__(self,name):
#         if self.__dict__.has_key(name):
#             return self.__dict__[name]
#         else:
#             return None
#
#     def __delattr__(self,name):
#         if name in self.__dict__:
#             raise self.ConstError,"Can't unbind const(%s)" % name
#         raise NameError,name
#
# sys.modules[__name__] = _TConst()
#
