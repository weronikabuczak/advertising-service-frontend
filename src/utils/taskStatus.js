export const colorsClasses = {
    RED: '#db2828',
    BLUE: '#2185d0',
    TEAL: '#00b5ad',
};

export const colors = {
    RED: 'red',
    BLUE: 'blue',
    TEAL: 'teal',
};

export const statuses = {
    'AWAITING': {
        pl: 'Oczekujące',
        en: 'Awaiting',
        colorClass:  colorsClasses.RED,
        colors: colors.RED
    },
    'IN_PROGRESS': {
        pl: 'W trakcie',
        en: 'In progress',
        colorClass: colorsClasses.BLUE,
        colors: colors.BLUE
    },
    'DONE': {
        pl: 'Zakończone',
        en: 'Done',
        colorClass: colorsClasses.TEAL,
        colors: colors.TEAL
    },
}