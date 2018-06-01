# -*- coding: utf-8 -*-

class TDictWrap(dict):
    def __getattr__(self, name):
        try:
            return self[name]
        except KeyError:
            raise AttributeError(name)
