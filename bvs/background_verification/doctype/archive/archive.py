# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class Archive(Document):
    def autoname(self):
        self.name = self.checks_group + "/" + \
            self.candidate_name + "/" + self.employee_number
