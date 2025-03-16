import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";

export const navigationLinks = [
    { id: 1, title: 'Главная', path:'/', image: iconsImgs.home },
    { id: 2, title: 'Сотрудники', path:'/employees', image: iconsImgs.budget },
    { id: 3, title: 'Учет активности', path:'/worktime', image: iconsImgs.plane },
    { id: 4, title: 'Программы', path:'/applications', image: iconsImgs.wallet },
    { id: 5, title: 'Скриншоты', path:'/screenshots', image: iconsImgs.bills },
    { id: 6, title: 'Отчеты', path:'/reports', image: iconsImgs.report },
    { id: 7, title: 'Аккаунт', path:'/profile', image: iconsImgs.user },
    { id: 8, title: 'Настройки', path:'/settings', image: iconsImgs.gears },
    { id: 9, title: 'Выйти', path:'/logout', image: iconsImgs.logout }
];

export const transactions = [
    {
        id: 11, 
        name: "Sarah Parker",
        image: personsImgs.person_four,
        role: "Отдел кадров",
        status: "Online"
    },
    {
        id: 12, 
        name: "Krisitine Carter",
        image: personsImgs.person_three,
        role: "Разработчик",
        status: "Offline"
    },
    {
        id: 13, 
        name: "Irene Doe",
        image: personsImgs.person_two,
        role: "Разработчик",
        status: "Offline"
    }
];

export const reportData = [
    {
        id: 14,
        month: "Jan",
        value1: 45,
        value2: null
    },
    {
        id: 15,
        month: "Feb",
        value1: 45,
        value2: 60
    },
    {
        id: 16,
        month: "Mar",
        value1: 45,
        value2: null
    },
    {
        id: 17,
        month: "Apr",
        value1: 45,
        value2: null
    },
    {
        id: 18,
        month: "May",
        value1: 45,
        value2: null
    }
];

export const budget = [
    {
        id: 19, 
        title: "Subscriptions",
        type: "Automated",
        amount: 22000
    },
    {
        id: 20, 
        title: "Loan Payment",
        type: "Automated",
        amount: 16000
    },
    {
        id: 21, 
        title: "Foodstuff",
        type: "Automated",
        amount: 20000
    },
    {
        id: 22, 
        title: "Subscriptions",
        type: null,
        amount: 10000
    },
    {
        id: 23, 
        title: "Subscriptions",
        type: null,
        amount: 40000
    }
];

export const subscriptions = [
    {
        id: 24,
        title: "LinkedIn",
        due_date: "23/12/04",
        amount: 20000
    },
    {
        id: 25,
        title: "Netflix",
        due_date: "23/12/10",
        amount: 5000
    },
    {
        id: 26,
        title: "DSTV",
        due_date: "23/12/22",
        amount: 2000
    }
];

export const savings = [
    {
        id: 27,
        image: personsImgs.person_one,
        saving_amount: 250000,
        title: "Pay kid bro’s fees",
        date_taken: "23/12/22",
        amount_left: 40000
    }
]