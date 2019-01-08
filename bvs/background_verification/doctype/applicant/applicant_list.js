// frappe.listview_settings['Applicant'] = {
// 	refresh:function(me){	
//         if((frappe.user.has_role("BVS Verifier")) || (frappe.user.has_role("BVS DEO"))){
//         // if((!frappe.user.has_role("BVS Manager")) || (!frappe.user.has_role("System Manager"))){
//             if (!frappe.route_options) {
//                 frappe.route_options = {
//                     "executive": ["=", frappe.session.user]
//                 };
//             }
//         }
// 	}
// };