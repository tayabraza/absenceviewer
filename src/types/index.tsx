export interface Absence {
    id:          number;
    startDate:   string;
    days:        number;
    absenceType: string;
    employee:    Employee;
    approved:    boolean;
}

interface Employee {
    firstName: string;
    lastName:  string;
    id:        string;
}
