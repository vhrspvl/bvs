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
    checks = ["Verify Employment Check1","Verify Employment Check2","Verify Employment Check3","Verify Employment Check4","Verify Education Check1","Verify Education Check2","Verify Education Check3","Verify Education Check4",
    "Verify Address Check1","Verify Address Check2","Verify Address Check3","Verify Address Check4","Verify Family Check1","Verify Family Check2","Verify Family Check3","Verify Family Check4","Verify Reference Check1","Verify Reference Check2",
    "Verify Reference Check3","Verify Reference Check4","Verify Civil Check","Verify Criminal Check","Verify Aadhar Card Verification","Verify Pan Verification","Verify Passport Verification","Verify Voters ID Verification","Verify Driving License Verification",
    "Verify Ration Card Verification","Employment Check1","Employment Check2","Employment Check3","Employment Check4","Education Check1","Education Check2","Education Check3","Education Check4","Address Check1","Address Check2","Address Check3","Address Check4",
    "Family Check1","Family Check2","Family Check3","Family Check4","Reference Check1","Reference Check2","Reference Check3","Reference Check4","Aadhar Card Verification","Pan Verification","Passport Verification","Voters ID Verification","Ration Card Verification","Driving License Verification"]   
    for check in checks:
        check1 = frappe.get_list(check, filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer")) 
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':check} 
            c.update(cdt)
            c1dt.append(c)
        return check1
        




@frappe.whitelist()
def get_check(check):
    if check == "Employment Check":
        check1 = frappe.get_list("Employment Check1", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Employment Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Employment Check2", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Employment Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Employment Check3", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Employment Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Employment Check4", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Employment Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Education Check":
        check1 = frappe.get_list("Education Check1", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Education Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Education Check2", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Education Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Education Check3", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Education Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Education Check4", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Education Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Address Check":
        check1 = frappe.get_list("Address Check1", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Address Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Address Check2", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Address Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Address Check3", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Address Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Address Check4", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Address Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Family Check":
        check1 = frappe.get_list("Family Check1", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Family Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Family Check2", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Family Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Family Check3", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Family Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Family Check4", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Family Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Reference Check":
        check1 = frappe.get_list("Reference Check1", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Reference Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Reference Check2", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Reference Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Reference Check3", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Reference Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Reference Check4", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Reference Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Identity Check":
        check1 = frappe.get_list("Aadhar Card Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Aadhar Card Verification'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Pan Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Pan Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Passport Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Passport Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Driving License Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Driving License Verification'}
            c.update(cdt)
            c1dt.append(c)
        check5 = frappe.get_list("Ration Card Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check5:
            dt = {}
            cdt = {'doctype':'Ration Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check6 = frappe.get_list("Voters ID Verification", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        for c in check6:
            dt = {}
            cdt = {'doctype':'Voters ID Verification'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4+check5+check6
        frappe.errprint(pending_checks)
    if check == "Civil Check":
        check1 = frappe.get_list("Civil Check", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Civil Check'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1
    if check == "Criminal Check":
        check1 = frappe.get_list("Criminal Check", filters = {"executive": frappe.session.user}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Criminal Check'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1
    if check == "Verify Employment Check":
        check1 = frappe.get_list("Verify Employment Check1", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Employment Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Employment Check2", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Employment Check2'}
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Employment Check3", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Employment Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Employment Check4", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Employment Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Verify Education Check":
        check1 = frappe.get_list("Verify Education Check1", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Education Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Education Check2", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Education Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Education Check3", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Education Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Education Check4", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Education Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Verify Address Check":
        check1 = frappe.get_list("Verify Address Check1", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Address Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Address Check2", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Address Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Address Check3", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Address Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Address Check4", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Address Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Verify Family Check":
        check1 = frappe.get_list("Verify Family Check1", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Family Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Family Check2", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Family Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Family Check3", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Family Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Family Check4", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Family Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Verify Reference Check":
        check1 = frappe.get_list("Verify Reference Check1", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Reference Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Reference Check2", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Reference Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Reference Check3", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Reference Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Reference Check4", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Reference Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    if check == "Verify Identity Check":
        check1 = frappe.get_list("Verify Aadhar Card Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Aadhar Card Verification'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Pan Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Pan Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Passport Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Passport Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Driving License Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Driving License Verification'}
            c.update(cdt)
            c1dt.append(c)
        check5 = frappe.get_list("Verify Ration Card Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Ration Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check6 = frappe.get_list("Verify Voters ID Verification", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Voters ID Verification'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4+check5+check6
    if check == "Verify Civil Check":
        check1 = frappe.get_list("Verify Civil Check", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Civil Check'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1
    if check == "Verify Criminal Check":
        check1 = frappe.get_list("Verify Criminal Check", filters = {"executive": frappe.session.user, "status": "Pending"}, fields =("executive","name","status","allocated_for","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Criminal Check'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1
    return pending_checks