import frappe
from frappe import _


@frappe.whitelist()
def create_verify(doc, method):
    # frappe.errprint(doc)
    if doc.name1 == "Employment Check1":
        emp1_id = frappe.db.get_value("Verify Employment Check1", {"applicant_id": doc.applicant_id})
        if emp1_id:
            verify_emp1 = frappe.get_doc("Verify Employment Check1", emp1_id)
        else:
            verify_emp1 = frappe.new_doc("Verify Employment Check1")
        verify_emp1.update({
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "employment_check1_id": doc.name,
            "status": "Allocation Pending"
        })
        verify_emp1.save(ignore_permissions=True)
    if doc.name1 == "Employment Check2":
        emp2_id = frappe.db.get_value("Verify Employment Check2", {"applicant_id": doc.applicant_id})
        if emp2_id:
            verify_emp2 = frappe.get_doc("Verify Employment Check2", emp2_id)
        else:
            verify_emp2 = frappe.new_doc("Verify Employment Check2")
        verify_emp2.update({
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "employment_check2_id": doc.name,
            "status": "Allocation Pending"
        })
        verify_emp2.save(ignore_permissions=True)
    if doc.name1 == "Employment Check3":
        emp3_id = frappe.db.get_value("Verify Employment Check3", {"applicant_id": doc.applicant_id})
        if emp3_id:
            verify_emp3 = frappe.get_doc("Verify Employment Check3", emp3_id)
        else:
            verify_emp3 = frappe.new_doc("Verify Employment Check3")
        verify_emp3.update({
            "employment_check3_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_emp3.save(ignore_permissions=True)
    if doc.name1 == "Employment Check4":
        emp4_id = frappe.db.get_value("Verify Employment Check4", {"applicant_id": doc.applicant_id})
        if emp4_id:
            verify_emp4 = frappe.get_doc("Verify Employment Check4", emp4_id)
        else:
            verify_emp4 = frappe.new_doc("Verify Employment Check4")          
        verify_emp4.update({
            "employment_check4_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_emp4.save(ignore_permissions=True)
    if doc.name1 == "Education Check1":
        edu1_id = frappe.db.get_value("Verify Education Check1", {"applicant_id": doc.applicant_id})
        if edu1_id:
            verify_edu1 = frappe.get_doc("Verify Education Check1", edu1_id)
        else:
            verify_edu1 = frappe.new_doc("Verify Education Check1")
        verify_edu1.update({
            "education_check1_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_edu1.save(ignore_permissions=True)
    if doc.name1 == "Education Check2":
        edu2_id = frappe.db.get_value("Verify Education Check2", {"applicant_id": doc.applicant_id})
        if edu2_id:
            verify_edu2 = frappe.get_doc("Verify Education Check2", edu2_id)
        else:
            verify_edu2 = frappe.new_doc("Verify Education Check2")
        verify_edu2.update({
            "education_check2_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"         
        })
        verify_edu2.save(ignore_permissions=True)
    if doc.name1 == "Education Check3":
        edu3_id = frappe.db.get_value("Verify Education Check3", {"applicant_id": doc.applicant_id})
        if edu3_id:
            verify_edu3 = frappe.get_doc("Verify Education Check3", edu3_id)
        else:
            verify_edu3 = frappe.new_doc("Verify Education Check3")
        verify_edu3.update({
            "education_check3_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_edu3.save(ignore_permissions=True)
    if doc.name1 == "Education Check4":
        edu4_id = frappe.db.get_value("Verify Education Check4", {"applicant_id": doc.applicant_id})
        if edu4_id:
            verify_edu4 = frappe.get_doc("Verify Education Check4", edu4_id)
        else:
            verify_edu4 = frappe.new_doc("Verify Education Check4")
        verify_edu4.update({
            "education_check4_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"         
        })
        verify_edu4.save(ignore_permissions=True)
    if doc.name1 == "Reference Check1":
        ref1_id = frappe.db.get_value("Verify Reference Check1", {"applicant_id": doc.applicant_id})
        if ref1_id:
            verify_ref1 = frappe.get_doc("Verify Reference Check1", ref1_id)
        else:
            verify_ref1 = frappe.new_doc("Verify Reference Check1")
        verify_ref1.update({
            "reference_check1_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
            
        })
        verify_ref1.save(ignore_permissions=True)
    if doc.name1 == "Reference Check2":
        ref2_id = frappe.db.get_value("Verify Reference Check2", {"applicant_id": doc.applicant_id})
        if ref2_id:
            verify_ref2 = frappe.get_doc("Verify Reference Check2", ref2_id)
        else:
            verify_ref2 = frappe.new_doc("Verify Reference Check2")
        verify_ref2.update({
            "reference_check2_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
            
        })
        verify_ref2.save(ignore_permissions=True)
    if doc.name1 == "Reference Check3":
        ref3_id = frappe.db.get_value("Verify Reference Check3", {"applicant_id": doc.applicant_id})
        if ref3_id:
            verify_ref3 = frappe.get_doc("Verify Reference Check3", ref3_id)
        else:
            verify_ref3 = frappe.new_doc("Verify Reference Check3")
        verify_ref3.update({
            "reference_check3_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
            
        })
        verify_ref3.save(ignore_permissions=True)
    if doc.name1 == "Reference Check4":
        ref4_id = frappe.db.get_value("Verify Reference Check4", {"applicant_id": doc.applicant_id})
        if ref4_id:
            verify_ref4 = frappe.get_doc("Verify Reference Check4", ref4_id)
        else:
            verify_ref4 = frappe.new_doc("Verify Reference Check4")
        verify_ref4.update({
            "reference_check4_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
            
        })
        verify_ref4.save(ignore_permissions=True)
    if doc.name1 == "Address Check1":
        add1_id = frappe.db.get_value("Verify Address Check1", {"applicant_id": doc.applicant_id})
        if add1_id:
            verify_add1 = frappe.get_doc("Verify Address Check1", add1_id)
        else:
            verify_add1 = frappe.new_doc("Verify Address Check1")
        verify_add1.update({
            "address_check1_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"         
        })
        verify_add1.save(ignore_permissions=True)
    if doc.name1 == "Address Check2":
        add2_id = frappe.db.get_value("Verify Address Check2", {"applicant_id": doc.applicant_id})
        if add2_id:
            verify_add2 = frappe.get_doc("Verify Address Check2", add2_id)
        else:
            verify_add2 = frappe.new_doc("Verify Address Check2")
        verify_add2.update({
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "address_check2_id": doc.name,
            "status": "Allocation Pending"
        })
        verify_add2.save(ignore_permissions=True)
    if doc.name1 == "Address Check3":
        add3_id = frappe.db.get_value("Verify Address Check3", {"applicant_id": doc.applicant_id})
        if add3_id:
            verify_add3 = frappe.get_doc("Verify Address Check3", add3_id)
        else:
            verify_add3 = frappe.new_doc("Verify Address Check3")
        verify_add3.update({
            "address_check3_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"          
        })
        verify_add3.save(ignore_permissions=True)
    if doc.name1 == "Address Check4":
        add4_id = frappe.db.get_value("Verify Address Check4", {"applicant_id": doc.applicant_id})
        if add4_id:
            verify_add4 = frappe.get_doc("Verify Address Check4", add4_id)
        else:
            verify_add4 = frappe.new_doc("Verify Address Check4")
        verify_add4.update({
            "address_check4_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"       
        })
        verify_add4.save(ignore_permissions=True)
    if doc.name1 == "Family Check1":
        fmly1_id = frappe.db.get_value("Verify Family Check1", {"applicant_id": doc.applicant_id})
        if fmly1_id:
            verify_fmly1 = frappe.get_doc("Verify Family Check1", fmly1_id)
        else:
            verify_fmly1 = frappe.new_doc("Verify Family Check1")
        verify_fmly1.update({
            "family_check1_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_fmly1.save(ignore_permissions=True)
    if doc.name1 == "Family Check2":
        fmly2_id = frappe.db.get_value("Verify Family Check2", {"applicant_id": doc.applicant_id})
        if fmly2_id:
            verify_fmly2 = frappe.get_doc("Verify Family Check2", fmly2_id)
        else:
            verify_fmly2 = frappe.new_doc("Verify Family Check2")
        verify_fmly2.update({
            "family_check2_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_fmly2.save(ignore_permissions=True)
    if doc.name1 == "Family Check3":
        fmly3_id = frappe.db.get_value("Verify Family Check3", {"applicant_id": doc.applicant_id})
        if fmly3_id:
            verify_fmly3 = frappe.get_doc("Verify Family Check3", fmly3_id)
        else:
            verify_fmly3 = frappe.new_doc("Verify Family Check3")
        verify_fmly3.update({
            "family_check3_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_fmly3.save(ignore_permissions=True)
    if doc.name1 == "Family Check4":
        fmly4_id = frappe.db.get_value("Verify Family Check4", {"applicant_id": doc.applicant_id})
        if fmly4_id:
            verify_fmly4 = frappe.get_doc("Verify Family Check4", fmly4_id)
        else:
            verify_fmly4 = frappe.new_doc("Verify Family Check4")
        verify_fmly4.update({
            "family_check4_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_fmly4.save(ignore_permissions=True)
    if doc.name1 == "Civil Check":
        # frappe.errprint("hi")
        cvl_id = frappe.db.get_value("Verify Civil Check", {"applicant_id": doc.applicant_id})
        if cvl_id:
            verify_cvl = frappe.get_doc("Verify Civil Check", cvl_id)
        else:
            verify_cvl = frappe.new_doc("Verify Civil Check")
        verify_cvl.update({
            "civil_check_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_cvl.save(ignore_permissions=True)
    if doc.name1 == "Criminal Check":
        cmv_id = frappe.db.get_value("Verify Criminal Check", {"applicant_id": doc.applicant_id})
        if cmv_id:
            verify_cmv = frappe.get_doc("Verify Criminal Check", cmv_id)
        else:
            verify_cmv = frappe.new_doc("Verify Criminal Check")
        verify_cmv.update({
            "criminal_check_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_cmv.save(ignore_permissions=True)
    
    if doc.name1 == "Pan Verification":
        pv_id = frappe.db.get_value("Verify Pan Verification", {"applicant_id": doc.applicant_id})
        if pv_id:
            verify_pv = frappe.get_doc("Verify Pan Verification", pv_id)
        else:
            verify_pv = frappe.new_doc("Verify Pan Verification")
        verify_pv.update({
            "pan_verification_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_pv.save(ignore_permissions=True)
    if doc.name1 == "Aadhar Card Verification":
        acv_id = frappe.db.get_value("Verify Aadhar Card Verification", {"applicant_id": doc.applicant_id})
        if acv_id:
            verify_acv = frappe.get_doc("Verify Aadhar Card Verification", acv_id)
        else:
            verify_acv = frappe.new_doc("Verify Aadhar Card Verification")
        verify_acv.update({
            "aadhar_card_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_acv.save(ignore_permissions=True)
    if doc.name1 == "Driving License Verification":
        dlv_id = frappe.db.get_value("Verify Driving License Verification", {"applicant_id": doc.applicant_id})
        if dlv_id:
            verify_dlv = frappe.get_doc("Verify Driving License Verification", dlv_id)
        else:
            verify_dlv = frappe.new_doc("Verify Driving License Verification")
        verify_dlv.update({
            "driving_license_verification_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_dlv.save(ignore_permissions=True)
    if doc.name1 == "Passport Verification":
        pass_id = frappe.db.get_value("Verify Passport Verification", {"applicant_id": doc.applicant_id})
        if pass_id:
            verify_pass = frappe.get_doc("Verify Passport Verification", pass_id)
        else:
            verify_pass = frappe.new_doc("Verify Passport Verification")
        verify_pass.update({
            "passport_verification_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_pass.save(ignore_permissions=True)
    if doc.name1 == "Ration Card Verification":
        rcv_id = frappe.db.get_value("Verify Ration Card Verification", {"applicant_id": doc.applicant_id})
        if rcv_id:
            verify_rcv = frappe.get_doc("Verify Ration Card Verification", rcv_id)
        else:
            verify_rcv = frappe.new_doc("Verify Ration Card Verification")
        verify_rcv.update({
            "ration_card_verification_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_rcv.save(ignore_permissions=True)
    if doc.name1 == "Voters ID Verification":
        viv_id = frappe.db.get_value("Verify Voters ID Verification", {"applicant_id": doc.applicant_id})
        if viv_id:
            verify_viv = frappe.get_doc("Verify Voters ID Verification", viv_id)
        else:
            verify_viv = frappe.new_doc("Verify Voters ID Verification")
        verify_viv.update({
            "voters_id_verification_id": doc.name,
            "applicant_id": doc.applicant_id,
            "customer": doc.customer,
            "checks_group": doc.checks_group,
            "applicant_name": doc.applicant_name,
            "status": "Allocation Pending"
        })
        verify_viv.save(ignore_permissions=True)
    



@frappe.whitelist()
def send_weekly_report():
    from_date = str(date.today() - relativedelta(weeks=1))
    to_date = add_days(today(), -1)
    custom_filter = {'from_date': from_date, 'to_date': to_date}
    report = frappe.get_doc('Report', "Client Weekly Report")
    columns, data = report.get_data(
        limit=500 or 500, filters=custom_filter, as_dict=True)
    html = frappe.render_template(
        'frappe/templates/includes/print_table.html', {'columns': columns, 'data': data})
    msg = "Kindly find the attached Client Weekly Report From " + \
        formatdate(from_date) + " To " + formatdate(to_date)
    frappe.sendmail(
        recipients=['ramya.a@voltechgroup.com'
                    # 'kelwin.n@voltechgroup.com',
                    # 'jagannathan.m@voltechgroup.com'
                    ],
        subject='Client Weekly Report Upto - ' +
        formatdate(add_days(today(), -1)),
        message=msg + html
    )