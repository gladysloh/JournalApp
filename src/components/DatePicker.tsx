import React from 'react';
import { IonButton, IonCard, IonCol, useIonPicker } from '@ionic/react';

function DatePicker() {
    const [present] = useIonPicker();

    let monthsOptions = [
        {
            text: 'January',
            value: 0,
        },
        {
            text: 'Feburary',
            value: 1,
        },
        {
            text: 'March',
            value: 2,
        },
        {
            text: 'April',
            value: 3,
        },
        {
            text: 'May',
            value: 4,
        },
        {
            text: 'June',
            value: 5,
        },
        {
            text: 'July',
            value: 6,
        },
        {
            text: 'August',
            value: 7,
        },
        {
            text: 'September',
            value: 8,
        },
        {
            text: 'October',
            value: 9,
        },
        {
            text: 'November',
            value: 10,
        },
        {
            text: 'December',
            value: 11,
        },
    ]

    let yearOptions = [
        {
            text: '2021',
            value: 2021,
        },
        {
            text: '2022',
            value: 2022,
        }
    ]

    const openPickerMonth = async () => {
        present({
            columns: [
                {
                    name: 'months',
                    options: monthsOptions
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Confirm',
                    handler: (value) => {
                        window.alert(`You selected: ${value.months.value}`);
                    },
                },
            ],
        });
    };

    const openPickerYear = async () => {
        present({
            columns: [
                {
                    name: 'years',
                    options: yearOptions
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Confirm',
                    handler: (value) => {
                        window.alert(`You selected: ${value.years.value}`);
                    },
                },
            ],
        });
    }

    return (<>
        <IonCol className="dayBackground">
            <IonCard className="day">
                <IonButton onClick={openPickerMonth}>{monthsOptions[new Date().getMonth()].text}</IonButton>
            </IonCard>
        </IonCol >
        <IonCol className="entryBackground">
            <IonCard className="day">
                <IonButton onClick={openPickerYear}>year</IonButton>
            </IonCard>
            </IonCol>
            </>);
}

export default DatePicker;