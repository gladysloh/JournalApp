import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonLabel,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonSelectOption,
    IonSelect,
    IonGrid,
    IonRow,
    IonCol,
    IonTextarea,
    IonCardTitle,
    IonFab,
    IonFabButton,
    IonFabList,
    IonImg, useIonToast, useIonViewDidEnter, useIonViewWillEnter, useIonLoading, useIonViewWillLeave, useIonViewDidLeave
} from '@ionic/react';
import { textSharp, imageSharp, help, closeCircleOutline } from 'ionicons/icons';

import './JournalTextEdit.css';

import question from '../theme/icons/question.png';
import text from '../theme/icons/text.png';
import image from '../theme/icons/image.png';
import uploadImage from '../theme/icons/uploadimage.png'
import axios from 'axios';

import { useHistory, useLocation, useParams } from "react-router-dom"
import { useSetState } from 'react-use';

import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';


export const JournalTextEdit: React.FC = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();

    const [logs, setLogs] = useState<string[]>([]);
    const pushLog = (msg: string) => {
        setLogs([msg, ...logs]);
    };

    const [showHide, setShowHide] = useState(true);
    const [segment, setSegment] = useState(['text']);
    const handleSegment = (e: any) => {
        console.log(e)
        setSegment(e)
        if (e == "image") { setShowHide(false) }
        else if (e == "text") setShowHide(true)
    }

    const history = useHistory();

    const initialJournal = {
        timestamp: {
            _seconds: 0
        },
        id: '',
        body: '',
        title: '',
        img: ''
    }

    const [editJournal, setEdit] = useSetState(initialJournal);
    const [uid, setUid] = useState<string>(localStorage.getItem("uid"));


    const location = useLocation();
    const params = new URLSearchParams(location.search)
    // const [journalMode, setMode] = useState<string>();

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search);

        let params = new URLSearchParams(location.search)
        let userJournal = JSON.parse(localStorage.getItem("journalEntry"))
        if (params.get("mode") == "edit") {
            setEdit(userJournal)
        }

    }, [location]);

    const [presentToast] = useIonToast();
    const toaster = (msg: any, icon: any) => {
        presentToast({
            message: msg,
            duration: 1500,
            position: 'bottom',
            cssClass: 'custom-toast',
            icon: icon
        });
    };

    const [qns, setQns] = useState([]);
    const questionPrompt = () => {
        const instance = axios.create({
            withCredentials: true,
            baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
        })

        instance.get('/getrandomquestion').then((res) => {
            console.log(res);
            setQns(res.data.question);
        }).catch((err) => {
            console.error("ERROR: ", err);
        })
    }

    const getJournalDay = () => {
        if (params.get('mode') == 'edit')
            return new Date(editJournal.timestamp._seconds * 1000).getDate()
        else if (params.get('mode') == 'create')
            return new Date().getDate();


    }

    const getJournalMonth = () => {
        if (params.get('mode') == 'edit')
            return monthNames[new Date(editJournal.timestamp._seconds * 1000).getMonth()]
        else if (params.get('mode') == 'create')
            return monthNames[new Date().getMonth()];
    }

    const getJournalYear = () => {
        if (params.get('mode') == 'edit')
            return new Date(editJournal.timestamp._seconds * 1000).getFullYear()
        else if (params.get('mode') == 'create')
            return new Date().getFullYear();
    }

    const [val, setVal] = useState(['edit']);
    const handleChange = (e: any) => {
        const newVal = e.detail.value;
        console.log(newVal);
        setVal(newVal);
        if (newVal == 'view') {
            handleViewJournal(editJournal)
        }
    };

    const handleViewJournal = (journal: any) => {
        console.log("edit")
        let jsonJournal = JSON.stringify(journal)
        localStorage.setItem("journalEntry", jsonJournal)

        history.push({
            pathname: '/tabs/journalview',
            search: '?mode=view&id=' + journal.id,
            state: { detail: 'view' }
        });
    }


    const [loading, setLoading] = useState(false);
    const [present, dismiss] = useIonLoading();

    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const onInputchange = (event: any) => {
        // console.log(event.target.name)
        setEdit({
            [event.target.name]: event.target.value
        });
    }

    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    // You can use async/await or any function that returns a Promise
    const sentiment = async (journalBody: any) => {
        const res = await instance.post('/sentimentanalyzer', journalBody)
        console.log(res.data.compound)
        if(res.status == 200){
            return res.data.compound
        }else{
            // throw new Error(res.statusText)
            return 0
        }
        
        
    }

    /**
   *
   * @param data
   */
    const handleSubmit = async (event: any) => {
        console.log(editJournal)

        setLoading(true);

        present({
            message: 'Saving Journal'
        })

        if (params.get('mode') == 'edit') {
            console.log()
            let editBody = {
                uid: uid,
                journalid: editJournal.id,
                newbody: editJournal.body,
                newtitle: editJournal.title,
                sentiment: await sentiment(editJournal.body)
            }

            console.log(editBody)

            instance.post('/editjournal', editBody).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.error("ERROR: ", err.response.data.error);
                dismiss();
                setLoading(false);
            })


        } else if (params.get('mode') == 'create') {

            let createBody = {
                uid: uid,
                title: editJournal.title,
                journal: editJournal.body,
                image: photos ? photos.webviewPath : false,
                sentiment: await sentiment(editJournal.body)
            }

            console.log(createBody)

            instance.post('/createjournal', createBody).then((res) => {
                console.log(res);
                dismiss();
                setLoading(false);
            }).catch((err) => {
                console.error("ERROR: ", err.response.data.error);
                dismiss();
                setLoading(false);
            })

        }

        dismiss();
        setLoading(false);


    };

    useIonViewDidLeave(() => {
        console.log('ionViewWillEnter event fired');
        deletePhoto(photos);
        setPhotoToDelete(undefined)
        setEdit(initialJournal)

    });

    const goToOverview = () => {
       
        history.push({
            pathname: '/tabs/journaloverview'
        });
    }





    return (

        <IonPage>
            <IonContent className="ioncontent">
                <IonGrid className="ionGrid">
                    <IonRow>
                        <IonGrid className="headingBackground">
                            <IonRow className="heading">
                                <IonCol size='2'>
                                    <IonRow className="dayBackground" >
                                        <IonCardSubtitle className="dayNo"> {getJournalDay()} </IonCardSubtitle>
                                    </IonRow>
                                </IonCol>
                                <IonCol size='8'>
                                    <IonRow>
                                        <IonCardSubtitle className="year">{getJournalYear()}</IonCardSubtitle>
                                    </IonRow>
                                    <IonRow>
                                        <IonCardTitle className="month">{getJournalMonth()}</IonCardTitle>
                                    </IonRow>
                                </IonCol>
                                <IonCol className="questionMarkBackground" size='2'>
                                    <IonButton className="questionMark" size="small" color="light" onClick={questionPrompt}>
                                        <IonImg className="questionMarkImg" src={question} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonRow>

                    {qns.length > 0 ?
                        (
                            <IonRow>
                                <IonCol size="12">
                                    <h3> <b> Random Question: </b> </h3>

                                    <p>{qns}</p>

                                </IonCol>
                            </IonRow>) :
                        (<span></span>)
                    }

                    <form onSubmit={handleSubmit}>

                        {showHide ?
                            <IonRow>
                                <IonCard className='journalEntryCard'>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow className="titleInputBackground">
                                                <IonCol>
                                                    <IonCardSubtitle>
                                                        <IonInput
                                                            className='titleInput'
                                                            value={editJournal.title}
                                                            onIonChange={onInputchange}
                                                            placeholder="Add title"
                                                            required={true}
                                                            name="title"
                                                            autocapitalize="true">
                                                        </IonInput>
                                                    </IonCardSubtitle>
                                                </IonCol>
                                                <IonCol size='5'>
                                                    <IonSelect
                                                        className="selectMode"
                                                        interface="popover"
                                                        placeholder="Select mode"
                                                        name="mode"
                                                        value={val} onIonChange={handleChange}>
                                                        <IonSelectOption className="selectMode" value="view">VIEW MODE</IonSelectOption>
                                                        <IonSelectOption className="selectMode" value="edit">EDIT MODE</IonSelectOption>
                                                    </IonSelect>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow className="bodyInputBackground">
                                                <IonTextarea
                                                    className='bodyInput'
                                                    placeholder="Begin your day here..."
                                                    value={editJournal.body}
                                                    name="body"
                                                    onIonChange={onInputchange}
                                                    required={true}
                                                    rows={10}
                                                    inputMode="text"
                                                    maxlength={1500}>
                                                </IonTextarea>
                                            </IonRow>

                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                            </IonRow>
                            :
                            <IonRow className="imageBackground">
                                <IonCol size="6">
                                    <IonImg src={photos ? photos.webviewPath : ''} />
                                </IonCol>
                                <IonCol size='12'>
                                    <IonCard className="journalImageCard">
                                        <IonCardContent>
                                            <IonImg className="uploadImageIcon" src={uploadImage} onClick={() => takePhoto()}></IonImg>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        }


                        <IonRow>
                            <IonCol size="6">
                                <IonButton onClick={handleSubmit} > SAVE JOURNAL </IonButton>
                            </IonCol>

                            <IonCol size="6">
                                <IonSegment className='inputType' onIonChange={e => handleSegment(e.detail.value)} value={segment}>
                                    <IonSegmentButton className='inputTypes' value="text">
                                        <IonLabel>
                                            <IonImg src={text} />
                                        </IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton className='inputTypes' value="image">
                                        <IonLabel>
                                            <IonImg src={image} />
                                        </IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                    </form>


                </IonGrid>

                <div className="spacer"></div>
            </IonContent>
        </IonPage>
    );
};

export default JournalTextEdit;