# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe,json
from frappe.model.document import Document
from frappe.utils.global_search import search

class AllocateChecks(Document):
    pass

@frappe.whitelist()
def get_check(check):
    # for c in check:
    # frappe.errprint(check)
    if check == "Verify Employment Check":
        check1 = frappe.get_list("Verify Employment Check1", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Employment Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Employment Check2", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Employment Check2'}
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Employment Check3", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Employment Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Employment Check4", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Employment Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Address Check":
        check1 = frappe.get_list("Address Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Address Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Address Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Address Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Address Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Address Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Address Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Address Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Verify Address Check":
        check1 = frappe.get_list("Verify Address Check1", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))       
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Address Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Address Check2", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Address Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Address Check3", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))        
        c1dt = []
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Address Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Address Check4", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Address Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Education Check":
        check1 = frappe.get_list("Education Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Education Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Education Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Education Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Education Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Education Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Education Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Education Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Education Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Education Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Education Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Education Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Verify Education Check":
        check1 = frappe.get_list("Verify Education Check1", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Education Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Education Check2", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Education Check2'}
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Education Check3", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Education Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Education Check4", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Education Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Employment Check":
        check1 = frappe.get_list("Employment Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Employment Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check1'}  
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Employment Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Employment Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Employment Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Employment Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Employment Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Employment Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Family Check":
        check1 = frappe.get_list("Family Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Family Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Family Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))        
        for c in check2:
            dt = {}
            cdt = {'doctype':'Family Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Family Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Family Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Family Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Family Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Verify Family Check":
        check1 = frappe.get_list("Verify Family Check1", filters = {"status": "Pending" or "Insufficient","executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Family Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Family Check2", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Family Check2'}
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Family Check3", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Family Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Family Check4", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Family Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Reference Check":
        check1 = frappe.get_list("Reference Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Reference Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Reference Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Reference Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Reference Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Reference Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Reference Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Reference Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Verify Reference Check":
        check1 = frappe.get_list("Verify Reference Check1", filters = {"status": "Pending" or "Insufficient","executive":""},fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Reference Check1'}
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Reference Check2", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Reference Check2'}
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Reference Check3", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Reference Check3'}
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Reference Check4", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Reference Check4'}
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Civil Check":
        pending_checks = frappe.get_list("Civil Check",  filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Civil Check'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Civil Check'} 
            c.update(cdt)
            c1dt.append(c)    
    elif check == "Criminal Check":		
        pending_checks = frappe.get_list("Criminal Check", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Criminal Check'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Criminal Check'} 
            c.update(cdt)
            c1dt.append(c)
    elif check == "Verify Civil Check":
        pending_checks = frappe.get_list("Verify Civil Check", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Verify Civil Check'} 
            c.update(cdt)
            c1dt.append(c)   
    elif check == "Verify Criminal Check":		
        pending_checks = frappe.get_list("Verify Criminal Check", filters = {"status": "Pending" or "Insufficient","executive":""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Verify Criminal Check'}
            c.update(cdt)
            c1dt.append(c)  
    elif check == "Identity Check":
        check1 = frappe.get_list("Aadhar Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        # frappe.errprint(check1)
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Aadhar Card Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Aadhar Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Voters ID Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Voters ID Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Voters ID Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Pan Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Pan Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Pan Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Ration Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Ration Card Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Ration Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check5 = frappe.get_list("Passport Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check5:
            dt = {}
            cdt = {'doctype':'Passport Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Passport Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check6 = frappe.get_list("Driving License Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        for c in check6:
            dt = {}
            cdt = {'doctype':'Driving License Verification'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Driving License Verification'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4+check5+check6
    elif check == "Verify Identity Check":
        check1 = frappe.get_list("Verify Aadhar Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Verify Aadhar Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Verify Voters ID Verification", filters = {"status": "Pending" or "Insufficient"},  fields =("applicant_id","name","status"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Verify Voters ID Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Verify Pan Verification", filters = {"status": "Pending" or "Insufficient"}, fields =("applicant_id","name","status"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Verify Pan Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Verify Ration Card Verification", filters = {"status": "Pending" or "Insufficient"}, fields =("applicant_id","name","status"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Verify Ration Card Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check5 = frappe.get_list("Verify Passport Verification", filters = {"status": "Pending" or "Insufficient"}, fields =("applicant_id","name","status"))
        for c in check5:
            dt = {}
            cdt = {'doctype':'Verify Passport Verification'} 
            c.update(cdt)
            c1dt.append(c)
        check6 = frappe.get_list("Verify Driving License Verification", filters = {"status": "Pending" or "Insufficient"}, fields =("applicant_id","name","status"))
        for c in check6:
            dt = {}
            cdt = {'doctype':'Verify Driving License Verification'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4+check5+check6
    return pending_checks


@frappe.whitelist()
def status_filter(status,check):
    if check == "Employment Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Employment Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []    
            for c in check1:
                dt = {}
                cdt = {'doctype':'Employment Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Employment Check1'}  
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Employment Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Employment Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Employment Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Employment Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Employment Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Employment Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Employment Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Employment Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Employment Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Address Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Address Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Address Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Address Check1'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Address Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Address Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Address Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Address Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Address Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Address Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Address Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Address Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Address Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Education Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Education Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Education Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check1'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Education Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Education Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Education Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Education Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Education Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Education Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Reference Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Reference Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Reference Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Reference Check1'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Reference Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Reference Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Reference Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Reference Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Reference Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Reference Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Reference Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Reference Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Reference Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Family Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Family Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Family Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Family Check1'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Family Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))        
            for c in check2:
                dt = {}
                cdt = {'doctype':'Family Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Family Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Family Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Family Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Family Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Family Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Family Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Family Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Identity Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check1 = frappe.get_list("Aadhar Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Aadhar Card Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Aadhar Card Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Voters ID Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Voters ID Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Voters ID Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Pan Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Pan Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Pan Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Ration Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Ration Card Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Ration Card Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check5 = frappe.get_list("Passport Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check5:
                dt = {}
                cdt = {'doctype':'Passport Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Passport Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check6 = frappe.get_list("Driving License Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check6:
                dt = {}
                cdt = {'doctype':'Driving License Verification'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Driving License Verification'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4+check5+check6
            return status
    elif check == "Civil Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check = frappe.get_list("Civil Check", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check:
                dt = {}
                cdt = {'doctype':'Civil Check'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Civil Check'} 
                c.update(cdt)
                c1dt.append(c)
            return check
    elif check == "Criminal Check":
        if status == "Allocation Completed" or "Allocation Pending" or "IQC Pending" or "Execution Pending" or "Entry Pending" or "Insufficient" or "QC Pending":
            check = frappe.get_list("Criminal Check", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check:
                dt = {}
                cdt = {'doctype':'Criminal Check'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Criminal Check'} 
                c.update(cdt)
                c1dt.append(c)
            return check
    if check == "Verify Employment Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Employment Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Employment Check1'}
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Employment Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Employment Check2'}
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Employment Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Employment Check3'}
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Employment Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Employment Check4'}
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Verify Address Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Address Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))       
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Address Check1'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Address Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Address Check2'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Address Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))        
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Address Check3'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Address Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Address Check4'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Verify Education Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Education Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Education Check1'}
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Education Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Education Check2'}
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Education Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Education Check3'}
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Education Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Education Check4'}
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Verify Reference Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Reference Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Reference Check1'}
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Reference Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Reference Check2'}
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Reference Check3", fields =("applicant_id","name","status"))
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Reference Check3'}
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Reference Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Reference Check4'}
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Verify Family Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Family Check1", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Family Check1'}
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Family Check2", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Family Check2'}
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Family Check3", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Family Check3'}
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Family Check4", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Family Check4'}
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4
            return status
    elif check == "Verify Identity Check":
        if status == "Insufficient" or "Pending":
            check1 = frappe.get_list("Verify Aadhar Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'Verify Aadhar Card Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check2 = frappe.get_list("Verify Voters ID Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check2:
                dt = {}
                cdt = {'doctype':'Verify Voters ID Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check3 = frappe.get_list("Verify Pan Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check3:
                dt = {}
                cdt = {'doctype':'Verify Pan Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check4 = frappe.get_list("Verify Ration Card Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check4:
                dt = {}
                cdt = {'doctype':'Verify Ration Card Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check5 = frappe.get_list("Verify Passport Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check5:
                dt = {}
                cdt = {'doctype':'Verify Passport Verification'} 
                c.update(cdt)
                c1dt.append(c)
            check6 = frappe.get_list("Verify Driving License Verification", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            for c in check6:
                dt = {}
                cdt = {'doctype':'Verify Driving License Verification'} 
                c.update(cdt)
                c1dt.append(c)
            status = check1+check2+check3+check4+check5+check6
            return status
    elif check == "Verify Civil Check":
        if status == "Insufficient" or "Pending":
            check = frappe.get_list("Verify Civil Check", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check:
                dt = {}
                cdt = {'doctype':'Verify Civil Check'} 
                c.update(cdt)
                c1dt.append(c)
            status == check
            return status
    elif check == "Verify Criminal Check":
        if status == "Insufficient" or "Pending":
            check = frappe.get_list("Verify Criminal Check", filters = {"executive": ""}, fields =("applicant_id","name","status"))
            c1dt = []
            for c in check:
                dt = {}
                cdt = {'doctype':'Verify Criminal Check'} 
                c.update(cdt)
                c1dt.append(c)
            status == check
            return status


@frappe.whitelist()
def get_verifycheck(applicant,check):
    if check == "Employment Check":       
        check1 = frappe.db.get_list("Verify Employment Check1", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Employment Check2", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Employment Check3", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Employment Check4", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4
    if check == "Education Check":
        check1 = frappe.db.get_list("Verify Education Check1", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Education Check2", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Education Check3", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Education Check4", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4
        return verify_checks
    if check == "Address Check":
        check1 = frappe.db.get_list("Verify Address Check1", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Address Check2", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Address Check3", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Address Check4", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4
    if check == "Reference Check":
        check1 = frappe.db.get_list("Verify Reference Check1", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Reference Check2", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Reference Check3", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Reference Check4", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4
    if check == "Family Check":
        check1 = frappe.db.get_list("Verify Family Check1", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Family Check2", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Family Check3", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Family Check4", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4
        # frappe.errprint(verify_checks)
    if check == "Identity Check":
        check1 = frappe.db.get_list("Verify Aadhar Card Verification", filters ={"applicant_id": applicant}, fields=("name"))
        check2 = frappe.db.get_list("Verify Pan Verification", filters ={"applicant_id": applicant}, fields=("name"))
        check3 = frappe.db.get_list("Verify Driving License Verification", filters ={"applicant_id": applicant}, fields=("name"))
        check4 = frappe.db.get_list("Verify Passport Verification", filters ={"applicant_id": applicant}, fields=("name"))
        check5 = frappe.db.get_list("Verify Ration Card Verification", filters ={"applicant_id": applicant}, fields=("name"))
        check6 = frappe.db.get_list("Verify Voters ID Verification", filters ={"applicant_id": applicant}, fields=("name"))
        verify_checks = check1+check2+check3+check4+check5+check6
    if check == "Civil Check":
        verify_checks = frappe.db.get_list("Verify Civil Check", filters ={"applicant_id": applicant}, fields=("name"))      
    if check == "Criminal Check":
        verify_checks = frappe.db.get_list("Verify Criminal", filters ={"applicant_id": applicant}, fields=("name"))
    return verify_checks

# @frappe.whitelist()
# def set_assign_to(doc,check):
#     executives = {}
#     executives = json.loads(doc)
#     for e in executives:
#         allocated_to = e.get("allocated_to")
#         doctype = e.get("reference_doctype")
#         docname = e.get("reference_name")
#         doc = frappe.get_doc(doctype,docname)
#         args = {
#             'executive': allocated_to
#         }
#         doc.update(args)
#         doc.save(ignore_permissions=True)
#         frappe.db.commit()
#     return "ok"


@frappe.whitelist()
def set_assign_to(doc,check):
    executives = {}
    executives = json.loads(doc)
    for e in executives:
        allocated_to = e.get("allocated_to")
        docstatus = e.get("status")
        doctype = e.get("reference_doctype")
        docname = e.get("reference_name")
        doc = frappe.get_doc(doctype,docname)
        args = {
            'in_date': frappe.utils.nowdate(),
            'executive': allocated_to,
            'allocated_for': docstatus
        }
        doc.update(args)
        doc.save(ignore_permissions=True)
        frappe.db.commit()
        docstatus = e.get("status")
        docapplicant = e.get("applicant")
        # doc = frappe.get_doc(doctype,docname)  
        if docstatus == "Allocation Pending":     
            if check == "Employment Check":
                emp1 = frappe.db.get_value("Employment Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if emp1:
                    emp1_doc = frappe.get_doc("Employment Check1",emp1["name"])
                    emp1_doc.status = "Allocation Completed"
                    emp1_doc.db_update()
                    frappe.db.commit()
                emp2 = frappe.db.get_value("Employment Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if emp2:
                    emp2_doc = frappe.get_doc("Employment Check2",emp2["name"])
                    emp2_doc.status = "Allocation Completed"
                    emp2_doc.db_update()
                    frappe.db.commit()
                emp3 = frappe.db.get_value("Employment Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if emp3:
                    emp3_doc = frappe.get_doc("Employment Check3",emp3["name"])
                    emp3_doc.status = "Allocation Completed"
                    emp3_doc.db_update()
                    frappe.db.commit()
                emp4 = frappe.db.get_value("Employment Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if emp4:
                    emp4_doc = frappe.get_doc("Employment Check4",emp4["name"])
                    emp4_doc.status = "Allocation Completed"
                    emp4_doc.db_update()
                    frappe.db.commit()
            if check == "Education Check":
                edu1 = frappe.db.get_value("Education Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if edu1:
                    edu1_doc = frappe.get_doc("Education Check1",edu1["name"])
                    edu1_doc.status = "Allocation Completed"
                    edu1_doc.db_update()
                    frappe.db.commit()
                edu2 = frappe.db.get_value("Education Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if edu2:
                    edu2_doc = frappe.get_doc("Education Check2",edu2["name"])
                    frappe.errprint(edu2_doc)
                    edu2_doc.status = "Allocation Completed"
                    edu2_doc.db_update()
                    frappe.db.commit()
                edu3 = frappe.db.get_value("Education Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if edu3:
                    edu3_doc = frappe.get_doc("Education Check3",edu3["name"])
                    edu3_doc.status = "Allocation Completed"
                    edu3_doc.db_update()
                    frappe.db.commit()
                edu4 = frappe.db.get_value("Education Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if edu4:
                    edu4_doc = frappe.get_doc("Education Check4",edu4["name"])
                    edu4_doc.status = "Allocation Completed"
                    edu4_doc.db_update()
                    frappe.db.commit()
            if check == "Address Check":
                add1 = frappe.db.get_value("Address Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if add1:
                    add1_doc = frappe.get_doc("Address Check1",add1["name"])
                    add1_doc.status = "Allocation Completed"
                    add1_doc.db_update()
                    frappe.db.commit()
                add2 = frappe.db.get_value("Address Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if add2:
                    add2_doc = frappe.get_doc("Address Check2",add2["name"])
                    add2_doc.status = "Allocation Completed"
                    add2_doc.db_update()
                    frappe.db.commit()
                add3 = frappe.db.get_value("Address Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if add3:
                    add3_doc = frappe.get_doc("Address Check3",add3["name"])
                    add3_doc.status = "Allocation Completed"
                    add3_doc.db_update()
                    frappe.db.commit()
                add4 = frappe.db.get_value("Address Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if add4:
                    add4_doc = frappe.get_doc("Address Check4",add4["name"])
                    add4_doc.status = "Allocation Completed"
                    add4_doc.db_update()
                    frappe.db.commit()
            if check == "Reference Check":
                ref1 = frappe.db.get_value("Reference Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if ref1:
                    ref1_doc = frappe.get_doc("Reference Check1",ref1["name"])
                    ref1_doc.status = "Allocation Completed"
                    ref1_doc.db_update()
                    frappe.db.commit()
                ref2 = frappe.db.get_value("Reference Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if ref2:
                    ref2_doc = frappe.get_doc("Reference Check2",ref2["name"])
                    ref2_doc.status = "Allocation Completed"
                    ref2_doc.db_update()
                    frappe.db.commit()
                ref3 = frappe.db.get_value("Reference Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if ref3:
                    ref3_doc = frappe.get_doc("Reference Check3",ref3["name"])
                    ref3_doc.status = "Allocation Completed"
                    ref3_doc.db_update()
                    frappe.db.commit()
                ref4 = frappe.db.get_value("Reference Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if ref4:
                    ref4_doc = frappe.get_doc("Reference Check4",ref4["name"])
                    ref4_doc.status = "Allocation Completed"
                    ref4_doc.db_update()
                    frappe.db.commit()
            if check == "Family Check":
                fam1 = frappe.db.get_value("Family Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if fam1:
                    fam1_doc = frappe.get_doc("Family Check1",fam1["name"])
                    fam1_doc.status = "Allocation Completed"
                    fam1_doc.db_update()
                    frappe.db.commit()
                fam2 = frappe.db.get_value("Family Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if fam2:
                    fam2_doc = frappe.get_doc("Family Check2",fam2["name"])
                    fam2_doc.status = "Allocation Completed"
                    fam2_doc.db_update()
                    frappe.db.commit()
                fam3 = frappe.db.get_value("Family Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if fam3:
                    fam3_doc = frappe.get_doc("Family Check3",fam3["name"])
                    fam3_doc.status = "Allocation Completed"
                    fam3_doc.db_update()
                    frappe.db.commit()
                fam4 = frappe.db.get_value("Family Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if fam4:
                    fam4_doc = frappe.get_doc("Family Check4",fam4["name"])
                    fam4_doc.status = "Allocation Completed"
                    fam4_doc.db_update()
                    frappe.db.commit()
            if check == "Identity Check":
                aad = frappe.db.get_value("Aadhar Card Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if aad:
                    aad_doc = frappe.get_doc("Aadhar Card Verification",aad["name"])
                    aad_doc.status = "Allocation Completed"
                    aad_doc.db_update()
                    frappe.db.commit()
                pan = frappe.db.get_value("Pan Card Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if pan:
                    pan_doc = frappe.get_doc("Pan Card Verification",pan["name"])
                    pan_doc.status = "Allocation Completed"
                    pan_doc.db_update()
                    frappe.db.commit()
                pas = frappe.db.get_value("Passport Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if pas:
                    pas_doc = frappe.get_doc("Passport Verification",pas["name"])
                    pas_doc.status = "Allocation Completed"
                    pas_doc.db_update()
                    frappe.db.commit()
                vot = frappe.db.get_value("Voters ID Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if vot:
                    vot_doc = frappe.get_doc("Voters ID Verification",vot["name"])
                    vot_doc.status = "Allocation Completed"
                    vot_doc.db_update()
                    frappe.db.commit()
                rat = frappe.db.get_value("Ration Card Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if rat:
                    rat_doc = frappe.get_doc("Ration Card Verification",rat["name"])
                    rat_doc.status = "Allocation Completed"
                    rat_doc.db_update()
                    frappe.db.commit()
                dri = frappe.db.get_value("Driving License Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if dri:
                    dri_doc = frappe.get_doc("Driving License Verification",dri["name"])
                    dri_doc.status = "Allocation Completed"
                    dri_doc.db_update()
                    frappe.db.commit()
            if check == "Civil Check":
                cvl = frappe.db.get_value("Civil Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if cvl:
                    cvl_doc = frappe.get_doc("Civil Verification",cvl["name"])
                    cvl_doc.status = "Allocation Completed"
                    cvl_doc.db_update()
                    frappe.db.commit()
            if check == "Criminal Check":
                cml = frappe.db.get_value("Civil Verification", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if cml:
                    cml_doc = frappe.get_doc("Civil Verification",cml["name"])
                    cml_doc.status = "Allocation Completed"
                    cml_doc.db_update()
                    frappe.db.commit()
    return "ok"
