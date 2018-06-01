# -*- coding: utf-8 -*-

from dictwrap import TDictWrap
import logging

class TSqlQuery(object):
    @classmethod
    def executeCommand(cls, db, query):
        result_ = 1
        try:
            db.execute(query)
            db.commit()
        except Exception as e:
            db.rollback()
            result_ = "请求参数错误！"
            logging.error(e)
            logging.info(query)
        return result_

    @classmethod
    def executeQuery(cls, db, query, limit_count=0, codec="GBK"):
        """
        :return: list[TDictWrap]
        """
        return_rows_ = []
        try:
            append_count_ = 0
            qry_sql_ = query
            qry_result_ = db.execute(qry_sql_).fetchall()
            for row_ in qry_result_:
                append_count_ += 1
                if limit_count > 0 and append_count_ > limit_count:
                    break
                fix_row_ = TDictWrap()
                for key_ in row_.keys():
                    row_value_ = row_[key_]
                    if row_value_ is None:
                        value_ = None
                    else:
                        if type(row_value_) == str:
                            value_ = row_value_.decode(codec)
                        else:
                            value_ = row_value_
                    fix_row_[key_.lower()] = value_
                if len(fix_row_):
                    return_rows_.append(fix_row_)
                if 0 != limit_count:
                    break
        except:
            db.rollback()
            return_rows_ = []
        return return_rows_

    @classmethod
    def executeFetchOne(cls, db, query, codec="GBK"):
        """
        :return: list[TDictWrap]
        """
        return cls.executeQuery(db, query, 1, codec)

    @classmethod
    def executeFetchAll(cls, db, query, codec="GBK"):
        """
        :return: list[TDictWrap]
        """
        return cls.executeQuery(db, query, codec=codec)

    def __init__(self, database):
        super(TSqlQuery, self).__init__()
        self._db = database

    def execute(self, sql):
        return self.executeCommand(self._db, sql)

    def query(self, sql, limit_count=0, codec="GBK"):
        return self.executeQuery(self._db, sql, limit_count, codec)

    def fetchAll(self, sql, codec="GBK"):
        return self.executeFetchAll(self._db, sql, codec)

    def fetchOne(self, sql, codec="GBK"):
        return self.executeFetchOne(self._db, sql, codec)
