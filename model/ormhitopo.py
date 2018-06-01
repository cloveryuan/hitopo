# -*- coding: utf-8 -*-
from sqlalchemy import Column,ForeignKey,Sequence,Table,text
from sqlalchemy.types import BigInteger,INTEGER,String,TIMESTAMP,VARCHAR,Float,BLOB

from ormbase import koBase,MAX_DESCRIPT_LEN,MAX_KEY_LEN,MAX_NAME_LEN

""""
{
  "info": ["myinfo"], 
  "autoSize": ["true"], 
  "links": [""], 
  "dataRate": ["1000"], 
  "title": [""], 
  "zoomMin": ["0.25"], 
  "bodyHtml": [""], 
  "isPannable": ["true"], 
  "headHtml": [""], 
  "filename": ["myname"], 
  "json": [
    "{\"v\":\"6.2.0\",\"p\":{\"layers\":[\"backgroundLayer\",\"nodeLayer\",\"textLayer\"],\"autoAdjustIndex\":true,\"hierarchicalRendering\":false},\"d\":[{\"c\":\"ht.Shape\",\"i\":97,\"p\":{\"layer\":\"backgroundLayer\",\"tag\":\"frameborder\",\"position\":{\"x\":512,\"y\":384},\"width\":1024,\"height\":768,\"points\":{\"__a\":[{\"x\":0,\"y\":0},{\"x\":1024,\"y\":0},{\"x\":1024,\"y\":768},{\"x\":0,\"y\":768},{\"x\":0,\"y\":0}]}},\"s\":{\"shape.border.width\":0.5,\"shape.background\":null,\"shape.border.color\":\"rgb(100,100,100)\",\"label.opacity\":0,\"2d.selectable\":false,\"2d.movable\":false,\"2d.editable\":false}},{\"c\":\"ht.Node\",\"i\":101,\"p\":{\"layer\":\"nodeLayer\",\"tag\":\"路由器101\",\"image\":\"images/node/router.png\",\"position\":{\"x\":136,\"y\":96}},\"a\":{\"modelRule\":\"defaultModel\"}}]}"
  ], 
  "animRate": ["500"], 
  "zoomMax": ["8"], 
  "isMovable": ["false"], 
  "id": ["0"]
}
"""

class TbHtFileInfo(koBase):
    sfile_name = Column(String(MAX_NAME_LEN),primary_key=True)
    iscene_id = Column(INTEGER)
    sfile_info = Column(String(MAX_DESCRIPT_LEN))
    iauto_size = Column(INTEGER)
    slinks = Column(String(MAX_KEY_LEN))
    stitle = Column(String(MAX_NAME_LEN))
    shead_html = Column(String(MAX_NAME_LEN))
    sbody_html = Column(String(MAX_NAME_LEN))
    fzoom_max = Column(Float)
    fzoom_min = Column(Float)
    fdata_rate = Column(Float)
    fanim_rate = Column(Float)
    ipan_able = Column(INTEGER)
    imove_able = Column(INTEGER)
    sjson = Column(BLOB)
    sspare_f = Column(String(MAX_KEY_LEN))
    sspare_s = Column(String(MAX_KEY_LEN))
