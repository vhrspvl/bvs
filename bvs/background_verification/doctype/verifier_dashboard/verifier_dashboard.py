# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class VerifierDashboard(Document):
    pass


@frappe.whitelist()
def get_checks():
    checks = ["Verify Employment Check1", "Verify Employment Check2", "Verify Employment Check3", "Verify Employment Check4", "Verify Education Check1", "Verify Education Check2", "Verify Education Check3", "Verify Education Check4",
              "Verify Address Check1", "Verify Address Check2", "Verify Address Check3", "Verify Address Check4", "Verify Family Check1", "Verify Family Check2", "Verify Family Check3", "Verify Family Check4", "Verify Reference Check1", "Verify Reference Check2",
              "Verify Reference Check3", "Verify Reference Check4", "Verify Civil Check", "Verify Criminal Check", "Verify ID Check1", "Verify ID Check2", "Verify ID Check3", "Verify ID Check4", "Verify ID Check5",
              "Verify ID Check6", "Verify Political Affiliations Check", "Verify Neighbourhood Check"]
    check1 = []
    for check in checks:
        if check:
            check1.append(frappe.get_list(check, filters={
                          "executive": frappe.session.user, "status": "Allocation Completed"}, fields=("status")))
        else:
            check1.append(0)
    return check1
