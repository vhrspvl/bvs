# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import datetime
from frappe.model.naming import make_autoname
from frappe.utils.data import today
from frappe.model.document import Document

class BulkExcelUpload(Document):
	def autoname(self):
    		self.name = make_autoname(self.customer 
                                + "/" + self.checks_group + "/" + today() + "/.###")
