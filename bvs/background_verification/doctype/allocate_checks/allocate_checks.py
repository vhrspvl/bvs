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
    if check == "Address Check":
        check1 = frappe.get_list("Address Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Address Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Address Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Address Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Address Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Address Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Address Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Address Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Address Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Education Check":
        check1 = frappe.get_list("Education Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check1:
            c1dt = []    
            for c in check1:
                dt = {}
                cdt = {'doctype':'Education Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check1'}  
                c.update(cdt)
                c1dt.append(c)
        else:
            check1.append(0)
        check2 = frappe.get_list("Education Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check2:
            c1dt = [] 
            for c in check2:
                dt = {}
                cdt = {'doctype':'Education Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check2'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check2.append(0)
        check3 = frappe.get_list("Education Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check3:
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'Education Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check3'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check3.append(0)
        check4 = frappe.get_list("Education Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check4:
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'Education Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify Education Check4'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check4.append(0)
        pending_checks = check1+check2+check3+check4
    elif check == "Employment Check":
        check1 = frappe.get_list("Employment Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []    
        for c in check1:
            dt = {}
            cdt = {'doctype':'Employment Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check1'}  
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Employment Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Employment Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Employment Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Employment Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Employment Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Employment Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Employment Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Family Check":
        check1 = frappe.get_list("Family Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Family Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Family Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))        
        for c in check2:
            dt = {}
            cdt = {'doctype':'Family Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Family Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Family Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Family Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Family Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Family Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Reference Check":
        check1 = frappe.get_list("Reference Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []
        for c in check1:
            dt = {}
            cdt = {'doctype':'Reference Check1'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check1'} 
            c.update(cdt)
            c1dt.append(c)
        check2 = frappe.get_list("Reference Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check2:
            dt = {}
            cdt = {'doctype':'Reference Check2'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check2'} 
            c.update(cdt)
            c1dt.append(c)
        check3 = frappe.get_list("Reference Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check3:
            dt = {}
            cdt = {'doctype':'Reference Check3'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check3'} 
            c.update(cdt)
            c1dt.append(c)
        check4 = frappe.get_list("Reference Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        for c in check4:
            dt = {}
            cdt = {'doctype':'Reference Check4'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Reference Check4'} 
            c.update(cdt)
            c1dt.append(c)
        pending_checks = check1+check2+check3+check4
    elif check == "Civil Check":
        pending_checks = frappe.get_list("Civil Check",  filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Civil Check'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Civil Check'} 
            c.update(cdt)
            c1dt.append(c)    
    elif check == "Criminal Check":		
        pending_checks = frappe.get_list("Criminal Check", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        c1dt = []
        for c in pending_checks:
            dt = {}
            cdt = {'doctype':'Criminal Check'}
            if c.status == "IQC Completed":
                cdt = {'doctype':'Verify Criminal Check'} 
            c.update(cdt)
            c1dt.append(c)  
    elif check == "Identity Check":
        check1 = frappe.get_list("ID Check1", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check1:
            c1dt = []
            for c in check1:
                dt = {}
                cdt = {'doctype':'ID Check1'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check1'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check1.append(0)
        check2 = frappe.get_list("ID Check2", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check2:
            c1dt = []
            for c in check2:
                dt = {}
                cdt = {'doctype':'ID Check2'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check2'} 
                c.update(cdt)
                c1dt.append(c)
            else:
                check2.append(0)
        check3 = frappe.get_list("ID Check3", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check3:
            c1dt = []
            for c in check3:
                dt = {}
                cdt = {'doctype':'ID Check3'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check3'} 
                c.update(cdt)
                c1dt.append(c)
            else:
                check3.append(0)
        check4 = frappe.get_list("ID Check4", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check4:
            c1dt = []
            for c in check4:
                dt = {}
                cdt = {'doctype':'ID Check4'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check4'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check4.append(0)
        check5 = frappe.get_list("ID Check5", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check5:
            c1dt = []
            for c in check5:
                dt = {}
                cdt = {'doctype':'ID Check5'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check5'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check5.append(0)
        check6 = frappe.get_list("ID Check6", filters = {"executive": "", "status": ("=","IQC Completed")}, fields =("applicant_id","name","status","tat","applicant_name","customer"))
        if check6:
            c1dt = []
            for c in check6:
                dt = {}
                cdt = {'doctype':'ID Check6'}
                if c.status == "IQC Completed":
                    cdt = {'doctype':'Verify ID Check6'} 
                c.update(cdt)
                c1dt.append(c)
        else:
            check6.append(0)     
        pending_checks = check1+check2+check3+check4+check5+check6 
    return pending_checks



@frappe.whitelist()
def get_verifycheck(applicant,check):
    if check == "Employment Check":       
        check1 = frappe.db.get_list("Verify Employment Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify Employment Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify Employment Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify Employment Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        verify_checks = check1+check2+check3+check4
    if check == "Education Check":
        check1 = frappe.db.get_list("Verify Education Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify Education Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify Education Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify Education Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        verify_checks = check1+check2+check3+check4
    if check == "Address Check":
        check1 = frappe.db.get_list("Verify Address Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify Address Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify Address Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify Address Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        verify_checks = check1+check2+check3+check4
    if check == "Reference Check":
        check1 = frappe.db.get_list("Verify Reference Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify Reference Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify Reference Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify Reference Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        verify_checks = check1+check2+check3+check4
    if check == "Family Check":
        check1 = frappe.db.get_list("Verify Family Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify Family Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify Family Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify Family Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        verify_checks = check1+check2+check3+check4
    if check == "Identity Check":
        check1 = frappe.db.get_list("Verify ID Check1", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check2 = frappe.db.get_list("Verify ID Check2", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check3 = frappe.db.get_list("Verify ID Check3", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check4 = frappe.db.get_list("Verify ID Check4", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check5 = frappe.db.get_list("Verify ID Check5", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
        check6 = frappe.db.get_list("Verify ID Check6", filters ={"applicant_id": applicant}, fields=("name","client_tat"))       
        verify_checks = check1+check2+check3+check4+check5+check6
    if check == "Civil Check":
        verify_checks = frappe.db.get_list("Verify Civil Check", filters ={"applicant_id": applicant}, fields=("name","client_tat"))      
    if check == "Criminal Check":
        verify_checks = frappe.db.get_list("Verify Criminal Check", filters ={"applicant_id": applicant}, fields=("name","client_tat"))
    frappe.errprint(verify_checks)
    return verify_checks



@frappe.whitelist()
def set_assign_to(doc,check):
    executives = {}
    executives = json.loads(doc)
    for e in executives:
        allocated_to = e.get("allocated_to")
        docstatus = e.get("status")
        doctype = e.get("reference_doctype")
        docname = e.get("reference_name")
        in_date = e.get("in_date")
        doc = frappe.get_doc(doctype,docname)
        args = {
            'allocated_for': "Execution Pending",
            'executive': allocated_to,
            'in_date': in_date,
            'assigned_date': frappe.utils.nowdate(),
            'status': "Allocation Completed"
        }
        doc.update(args)
        doc.save(ignore_permissions=True)
        frappe.db.commit()
        docstatus = e.get("status")
        docapplicant = e.get("applicant")
        # doc = frappe.get_doc(doctype,docname)  
        if allocated_to:     
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
                aad = frappe.db.get_value("ID Check1", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if aad:
                    aad_doc = frappe.get_doc("ID Check1",aad["name"])
                    aad_doc.status = "Allocation Completed"
                    aad_doc.db_update()
                    frappe.db.commit()
                pan = frappe.db.get_value("ID Check2", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if pan:
                    pan_doc = frappe.get_doc("ID Check2",pan["name"])
                    pan_doc.status = "Allocation Completed"
                    pan_doc.db_update()
                    frappe.db.commit()
                pas = frappe.db.get_value("ID Check3", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if pas:
                    pas_doc = frappe.get_doc("ID Check3",pas["name"])
                    pas_doc.status = "Allocation Completed"
                    pas_doc.db_update()
                    frappe.db.commit()
                vot = frappe.db.get_value("ID Check4", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if vot:
                    vot_doc = frappe.get_doc("ID Check4",vot["name"])
                    vot_doc.status = "Allocation Completed"
                    vot_doc.db_update()
                    frappe.db.commit()
                rat = frappe.db.get_value("ID Check5", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if rat:
                    rat_doc = frappe.get_doc("ID Check5",rat["name"])
                    rat_doc.status = "Allocation Completed"
                    rat_doc.db_update()
                    frappe.db.commit()
                dri = frappe.db.get_value("ID Check6", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if dri:
                    dri_doc = frappe.get_doc("ID Check6",dri["name"])
                    dri_doc.status = "Allocation Completed"
                    dri_doc.db_update()
                    frappe.db.commit()
            if check == "Civil Check":
                cvl = frappe.db.get_value("Civil Check", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if cvl:
                    cvl_doc = frappe.get_doc("Civil Check",cvl["name"])
                    cvl_doc.status = "Allocation Completed"
                    cvl_doc.db_update()
                    frappe.db.commit()
            if check == "Criminal Check":
                cml = frappe.db.get_value("Criminal Check", {"applicant_id": docapplicant}, ["name","status"],as_dict=1)
                if cml:
                    cml_doc = frappe.get_doc("Criminal Check",cml["name"])
                    cml_doc.status = "Allocation Completed"
                    cml_doc.db_update()
                    frappe.db.commit()
    return "ok"


@frappe.whitelist()
def get_applicant(batch_id):
    applicant = frappe.get_list("Applicant",{"data_entry_allocation_id":batch_id,"status":"Allocation Pending"},["name","checks_group"])
    return applicant



@frappe.whitelist()
def get_status(applicant,checks_group):
    entry_check = ["employment_check1","employment_check2","employment_check3","employment_check4","education_check1","education_check2","education_check3","education_check4",
    "address_check1","address_check2","address_check3","address_check4","family_check1","family_check2","family_check3","family_check4","reference_check1","reference_check2","reference_check3","reference_check4",
    "id_check1","id_check2","id_check3","id_check4","id_check5","id_check6","civil_check","criminal_check"]
    status = "Entry Pending"
    applicant_cg = frappe.get_all("Checks Group", ["*"], {"name":checks_group})
    for a in applicant_cg:
        checks = []
        for i in entry_check:
            if a.get(i) == 1:
                if i == "employment_check1":
                   checks.append("Employment Check1")
                if i == "employment_check2":
                   checks.append("Employment Check2")
                if i == "employment_check3":
                   checks.append("Employment Check3")
                if i == "employment_check4":
                   checks.append("Employment Check4")
                if i == "education_check1":
                   checks.append("Education Check1")
                if i == "education_check2":
                   checks.append("Education Check2")
                if i == "education_check3":
                   checks.append("Education Check3")
                if i == "education_check4":
                   checks.append("Education Check4")
                if i == "address_check1":
                   checks.append("Address Check1")
                if i == "address_check2":
                   checks.append("Address Check2")
                if i == "address_check3":
                   checks.append("Address Check3")
                if i == "address_check4":
                   checks.append("Address Check4")
                if i == "family_check1":
                   checks.append("Family Check1")
                if i == "family_check2":
                   checks.append("Family Check2")
                if i == "family_check3":
                   checks.append("Family Check3")
                if i == "family_check4":
                   checks.append("Family Check4")
                if i == "reference_check1":
                   checks.append("Reference Check1")
                if i == "reference_check2":
                   checks.append("Reference Check2")
                if i == "reference_check3":
                   checks.append("Reference Check3")
                if i == "reference_check4":
                   checks.append("Reference Check4")
                if i == "id_check1":
                   checks.append("ID Check1")
                if i == "id_check2":
                   checks.append("ID Check2")
                if i == "id_check3":
                   checks.append("ID Check3")
                if i == "id_check4":
                   checks.append("ID Check4")
                if i == "id_check5":
                   checks.append("ID Check5")
                if i == "id_check6":
                   checks.append("ID Check6")
                if i == "civil_check":
                   checks.append("Civil Check")
                if i == "criminal_check":
                   checks.append("Criminal Check")
        check1 = []
        for c in checks:
                check1.append(frappe.get_list("Verify "+c, {"applicant_id": applicant,"status": "Allocation Pending"}, ["name","applicant_id","status"]))
        frappe.errprint(check1)
        return check1