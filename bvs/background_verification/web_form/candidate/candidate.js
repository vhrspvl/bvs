frappe.ready(function() {
 
})

frappe.web_form.on('do_you_have_a_passport', (field, value) => {
    console.log("hi")
    if (value == 1) {
        frappe.web_form.set_field_value('passport_number', 'hidden', 1);
    }
});