import frappe
from frappe import _


@frappe.whitelist()
def create_verify_emp1(doc, method):
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
            "employment_check1_id": doc.name
        })
        verify_emp1.save(ignore_permissions=True)