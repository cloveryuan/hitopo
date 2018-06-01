# -*- coding: utf-8 -*-

from sqlalchemy.orm.session import sessionmaker
from sqlalchemy_utils import database_exists,create_database
from model.ormbase import createAll
from hrsqlite import THrSqlite
from model import ormhitopo

if __name__ == '__main__':
    THrSqlite().initHrView()
    engine_ = THrSqlite().hrEngine
    #
    if not database_exists(engine_.url):
        create_database(engine_.url)
    # 创建DBSession类型
    DBSession = sessionmaker(bind=engine_)
    # 创建session对象
    session = DBSession()
    try:
        # 创建表
        createAll(engine_)
    except BaseException,e:
        print('e.message=%s' % str(e.message))
    finally:
        session.close()
