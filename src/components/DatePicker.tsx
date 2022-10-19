import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCol, useIonPicker, useIonViewWillEnter } from '@ionic/react';

function DatePicker({selectDate}: any) {
    const [present] = useIonPicker();

    const [isMonth, setMonth] = useState(new Date().getMonth())
    const [isYear, setYear] = useState(new Date().getFullYear())

    const [isLoad, setIsLoading] = useState(false)
    let currMonth = new Date().getMonth()
    let currYear = new Date().getFullYear()
    
    useIonViewWillEnter(()=>{
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())

        console.log(isMonth, isYear)

        

    })



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
                        currMonth = value.months.value
                        sendSelectedDate()
                        
                        // window.alert(`You selected: ${value .months.value}`);
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
                        currYear = value.years.value
                        sendSelectedDate()
                        
                        // window.alert(`You selected: ${value.years.value}`);
                    },
                },
            ],
        });
    }

    const sendSelectedDate = () =>{
        setYear(currYear)
        setMonth(currMonth)
    }

    useEffect(()=>{
        // console.log({month: isMonth, year: isYear})
        selectDate({month: isMonth, year: isYear})
    },[isMonth])

    return (<>
        <IonCol className="dayBackground">
            <IonCard className="day">
                <IonButton onClick={openPickerMonth} >{ monthsOptions[isMonth].text}</IonButton>
            </IonCard>
        </IonCol >
        <IonCol className="entryBackground">
            <IonCard className="day">
                <IonButton onClick={openPickerYear}>{isYear}</IonButton>
            </IonCard>
            </IonCol>
            </>);
}

export default DatePicker;