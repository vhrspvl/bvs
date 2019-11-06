# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.model.document import Document
from frappe.utils import today


class Profile(Document):
    def autoname(self):
        self.name = make_autoname(
            self.checks_group + "/" + self.candidate_name + "/.###")

    def validate(self):
        if self.is_new() or not self.case_created_on:
            self.case_created_on = today()
