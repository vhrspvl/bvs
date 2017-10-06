# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
import frappe.www.list

no_cache = 1
no_sitemap = 1


def get_context(context):
    if frappe.session.user == 'Guest':
        frappe.throw(_("You need to be logged in to access this page"),
                     frappe.PermissionError)

    context.show_sidebar = True

    customer = frappe.db.get_value("User", frappe.session.user, "customer")
    context.casescount = frappe.db.sql(
        """select count(name) from `tabCases` as a where a.owner=%s""", (frappe.session.user))[0][0]
