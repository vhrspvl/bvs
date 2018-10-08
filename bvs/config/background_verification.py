from frappe import _


def get_data():
    return [
        {
            'module_name': 'Background Verification',
            'color': 'grey',
            'icon': 'fa fa-star',
            'type': 'module',
            'label': _('Background Verification'),
            'items': [
                {
                    'type': 'doctype',
                    'name': 'Checks Group',
                    'label': _('Checks Group'),
                    'description': _('VHRS Associate Database'),
                    'hide_count': False
                },
                {
                    'type': 'doctype',
                    'name': 'Add Profile',
                    'icon': 'fa fa-star',
                    'label': _('Add Profile'),
                    'description': _('VHRS Candidate Database')
                },
                {
                    'type': 'doctype',
                    'name': 'BG Profile',
                    'icon': 'fa fa-star',
                    'label': _('BG Profile'),
                    'description': _('Recruitment Documentation')
                },
                {
                    'type': 'doctype',
                    'name': 'Bulk Excel Upload',
                    'label': _('Bulk Excel Upload'),
                    'description': _('Interviews for Projects')
                },
                {
                    'type': 'doctype',
                    'name': 'Demographic Data With Attachment',
                    'label': _('Demographic Data With Attachment'),
                    'description': _('Interviews for Projects')
                },
                {
                    'type': 'doctype',
                    'name': 'Archive',
                    'label': _('Archive'),
                    'description': _('Interviews for Projects')
                },
                {
                    'type': 'page',
                    'name': 'dashboard',
                    'icon': 'fa fa-dashboard',
                    'label': _('Dashboard'),
                    'description': _('VHRS Candidate Database')
                }
            ]
        }
    ]
