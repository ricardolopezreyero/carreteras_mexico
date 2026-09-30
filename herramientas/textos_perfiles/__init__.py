# -*- coding: utf-8 -*-
# RLR · Junta los textos de todos los perfiles — Ricardo López Reyero · EYE 181218
from .comun import COMUN
from . import a_estructura, b_staff, c_frentes, d_colado, e_resto

PERFILES = {}
for m in (a_estructura, b_staff, c_frentes, d_colado, e_resto):
    PERFILES.update(m.P)
