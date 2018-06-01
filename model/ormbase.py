# -*- coding:utf-8 -*-
__author__ = 'admin'

MAX_VCHAR_LEN = 20
MAX_NAME_LEN = 50
MAX_DESCRIPT_LEN = 100
MAX_KEY_LEN = 64
#
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import MetaData,Column,Sequence,Table,text
from sqlalchemy.types import BigInteger,INTEGER,String,TIMESTAMP,VARCHAR,Float

class koBaseClass(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

        # __table_args__ = {'mysql_engine': 'InnoDB'}

class koConfigTable(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    # __table_args__ = {'mysql_engine': 'InnoDB'}
    id = Column("fi_id",BigInteger(),Sequence("%s_id_seq" % __name__),primary_key=True)
    uid = Column("fs_uid",String(MAX_KEY_LEN))
    name = Column("fs_name",VARCHAR(MAX_NAME_LEN))
    descript = Column("fs_descript",VARCHAR(MAX_DESCRIPT_LEN))
    tag = Column("fi_tag",INTEGER)
    spare_f = Column("fs_spare_f",String(MAX_NAME_LEN))
    spare_s = Column("fs_spare_s",String(MAX_NAME_LEN))

class koHistoryTable(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

        # __table_args__ = {'mysql_engine': 'MyISAM'}

from sqlalchemy.ext.declarative import declarative_base

#
koTable = declarative_base()
koBase = declarative_base(cls=koBaseClass)
koConfigBase = declarative_base(cls=koConfigTable)
koHistoryBase = declarative_base(cls=koHistoryTable)

# 创建从Base派生的所有表
def createAll(eng):
    koTable.metadata.create_all(eng)
    koBase.metadata.create_all(eng)
    koConfigBase.metadata.create_all(eng)
    koHistoryBase.metadata.create_all(eng)

# 删除数据库中从Base派生的所有表
def dropAll(eng):
    koTable.metadata.drop_all(eng)
    koBase.metadata.drop_all(eng)
    koConfigBase.metadata.drop_all(eng)
    koHistoryBase.metadata.drop_all(eng)

def copyTable(dest_engine,table_name,table_object):
    metadata_ = MetaData(bind=dest_engine)
    columns_ = [Column(column_.name,column_.type,primary_key=column_.primary_key)
        for column_ in table_object.__table__.columns]
    new_table_ = Table(table_name,metadata_,*columns_,
        mysql_engine='InnoDB',
        mysql_charset='utf8')
    new_table_.create(dest_engine)
