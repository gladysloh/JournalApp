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
    IonImg, useIonToast, useIonViewDidEnter, useIonViewWillEnter, useIonLoading, useIonViewWillLeave, useIonViewDidLeave, IonActionSheet, useIonAlert
} from '@ionic/react';
import { textSharp, imageSharp, help, closeCircleOutline, trash, close } from 'ionicons/icons';

import './JournalTextEdit.css';

import question from '../../theme/icons/question.png';
import text from '../../theme/icons/text.png';
import image from '../../theme/icons/image.png';
import uploadImage from '../../theme/icons/uploadimage.png'
import axios from 'axios';

import { useHistory, useLocation, useParams } from "react-router-dom"
import { useSetState } from 'react-use';

import { base64FromPath, usePhotoGallery, UserPhoto } from '../../hooks/usePhotoGallery';
import { MONTH_NAMES } from '../../SharedVariables';
import { questionPrompt, getSentiment, editJournal, createJournal, getJournal, deleteJournal } from '../../services/JournalService'
import { CreateJournalEntry, EditJournalEntry, UserJournal } from '../../interfaces/JournalInterface';


export const JournalTextEdit: React.FC = () => {

    const initialJournal: UserJournal = {
        createdTimestamp: {
            _seconds: 0
        },
        body: '',
        title: '',
        url: '',
        filename: "",
        sentiment: 0
    }

    const [showHide, setShowHide] = useState(true);
    const [segment, setSegment] = useState('text');

    const [val, setVal] = useState('edit');
    const [mode, setMode] = useState('')
    const [disabled, setDisable] = useState(true);

    const [editBody, setEdit] = useSetState(initialJournal);

    const history = useHistory();
    const [journalId, setJournalId] = useState<string>()

    const [loading, setLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false)
    const [present, dismiss] = useIonLoading();

    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const [presentAlert] = useIonAlert();

    const handleSegment = (e: any) => {
        console.log(e)
        setSegment(e)
        if (e == "image") { setShowHide(false) }
        else if (e == "text") setShowHide(true)
    }


    const loadEditData = async (journalId: any) => {

        let result = await getJournal(journalId)
        console.log(journalId)
        console.log(result)
        if (result.success) {
            setVal('edit')
            setEdit(result.journal)
            setMode("edit")
            setDisable(false)
        }
        else {
            history.replace('/tabs/journaloverview')
        }

        setLoading(false)
        setIsLoad(true)
    }

    const loadCreateData = async () => {

        console.log(initialJournal)
        setEdit(initialJournal)
        setVal('edit')
        setMode("create")
        setDisable(true)
        setLoading(false)
        setIsLoad(true)
    }


    useIonViewWillEnter(() => {
        setIsLoad(false)
        setQns([])
        let params = new URLSearchParams(history.location.search)
        console.log("enter journal edit")
        let jid = params.get("id") || ''
        let modeType = params.get("mode") || ''
        console.log(jid)
        setJournalId(jid)


        if (modeType === "create") loadCreateData()
        if (modeType === "edit") loadEditData(jid)
    }, [journalId]);

    /*** ==================================================================
     * Initialization
     */
    const getJournalImg = () => {
        if (photos || editBody.url) {
            if (photos?.webviewPath) {
                if (photos.webviewPath != '') {
                    let photoFile = photos.webviewPath
                    console.log(photoFile)
                    return (<IonImg src={photos.webviewPath} onClick={() => setPhotoToDelete(photos)} />)
                }
            } else if (editBody.url) {
                return (<IonImg src={editBody.url} />)
            }

        }
    }

    const getJournalDay = () => {
        if (mode == 'edit')
            return new Date(editBody.createdTimestamp._seconds * 1000).getDate()
        else if (mode == 'create')
            return new Date().getDate();
    }

    const getJournalMonth = () => {
        if (mode == 'edit')
            return MONTH_NAMES[new Date(editBody.createdTimestamp._seconds * 1000).getMonth()]
        else if (mode == 'create')
            return MONTH_NAMES[new Date().getMonth()];
    }

    const getJournalYear = () => {
        if (mode == 'edit')
            return new Date(editBody.createdTimestamp._seconds * 1000).getFullYear()
        else if (mode == 'create')
            return new Date().getFullYear();
    }

    /**
     * ============================================================================================
     */

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
    const getQuestion = () => {
        questionPrompt().then(res => {
            setQns(res.question);
        }).catch(err => console.log(err))
    }

    const handleChange = (e: any) => {
        const newVal = e.detail.value;
        console.log(newVal);
        setVal(newVal);
        if (newVal == 'view') {
            handleViewJournal()
        }
    };

    const handleViewJournal = () => {
        console.log("edit")
        history.replace({
            pathname: '/tabs/journalview',
            search: '?mode=view&id=' + journalId,
            state: { detail: 'view' }
        });
    }

    const onInputchange = (event: any) => {
        // console.log(event.target.name)
        setEdit({
            [event.target.name]: event.target.value
        });
    }
    /**
   *
   * @param data
   */
    const handleSubmit = async (event: any) => {
        console.log(editBody)

        setLoading(true);

        present({
            message: 'Saving Journal'
        })

        if (mode == 'edit') {
            let tempPhotos = photos != undefined ? photos.webviewPath : ''
            let tempImg = tempPhotos ? await base64FromPath(tempPhotos) : '';

            let sentimentVal = await getSentiment(editBody.body);

            let newEditBody: EditJournalEntry = {
                journalid: journalId || '',
                newbody: editBody.body,
                newtitle: editBody.title,
                filename: editBody.filename,
                newimage: tempImg != '' ? tempImg.split(",").pop() : false,
                sentiment: sentimentVal
            }

            setEdit(newEditBody)
            console.log(editBody)

            editJournal(newEditBody).then((res) => {
                console.log(res);
                dismiss();
                setLoading(false);
                goToSentiment(sentimentVal, newEditBody.journalid)
            }).catch((err) => {
                dismiss();
                setLoading(false);
                if (err.response.status == 400) {
                    presentAlert({
                        header: 'Failed to save journal!',
                        message: err.response.data.message,
                        buttons: ['OK'],
                    })
                }
                console.error("ERROR: ", err);
            })


        } else if (mode == 'create') {
            // console.log(await base64FromPath(photos.webviewPath))
            let tempPhotos = photos != undefined ? photos.webviewPath : '';
            let tempImg = '';
            if (tempPhotos != '') {
                tempImg = tempPhotos ? await base64FromPath(tempPhotos) : '';
            }

            let sentimentVal = await getSentiment(editBody.body);

            let createBody: CreateJournalEntry = {
                title: editBody.title,
                journal: editBody.body,
                image: tempImg != '' ? tempImg.split(",").pop() : false,
                sentiment: sentimentVal.compound
            }

            setEdit(createBody)
            console.log(createBody)

            createJournal(createBody).then((res) => {
                console.log(res);
                dismiss();
                setLoading(false);
                goToSentiment(createBody.sentiment, res.id)
            }).catch((err) => {
                dismiss();
                setLoading(false);
                toaster("Error! Something went wrong", closeCircleOutline)
                console.error("ERROR: ", err);
            })

        }


    };

    const deleteCurrJournal = async () => {
        setLoading(true);

        present({
            message: 'Deleting Journal'
        })

        deleteJournal(journalId).then((res) => {
            console.log(res);
            dismiss();
            goToOverview()
        }).catch((err) => {
            dismiss();
            setLoading(false);
            console.error("ERROR: ", err);
        })
    };

    useIonViewDidLeave(() => {
        console.log('ionViewWillEnter event fired');

        removeImage()
        localStorage.removeItem("journalEntry")
        setEdit(initialJournal)
    });

    const removeImage = () => {
        deletePhoto(photos)
        setPhotoToDelete(undefined);
    }

    const goToOverview = () => {
        history.replace({
            pathname: '/tabs/journaloverview'
        });
    }

    const goToSentiment = (sentiment: number, journalId: any) => {

        history.replace({
            pathname: '/tabs/journalmood',
            search: `?sentiment=${sentiment}&journalid=${journalId}`,
        });
    }


    return (

        <IonPage>
            <IonContent className="ioncontent">
                {
                    isLoad ?
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
                                            <IonButton className="questionMark" size="small" color="light" onClick={() => getQuestion()}>
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
                                                <IonGrid className="journalEntryGrid">
                                                    <IonRow className="nomargin">
                                                        <IonCol className="selectModeBackground">
                                                            <IonSelect
                                                                className="selectMode"
                                                                interface="popover"
                                                                placeholder="Select mode"
                                                                name="mode"
                                                                value={val} onIonChange={handleChange}>
                                                                <IonSelectOption className="selectMode" value="view" disabled={disabled}>VIEW MODE</IonSelectOption>

                                                                <IonSelectOption className="selectMode" value="edit">EDIT MODE</IonSelectOption>
                                                            </IonSelect>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow className="titleInputBackground">
                                                        <IonCol>
                                                            <IonCardSubtitle>
                                                                <IonInput
                                                                    className='titleInput'
                                                                    value={editBody.title}
                                                                    onIonChange={onInputchange}
                                                                    placeholder="Add title"
                                                                    required={true}
                                                                    name="title"
                                                                    autocapitalize="true">
                                                                </IonInput>
                                                            </IonCardSubtitle>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow className="bodyInputBackground">
                                                        <IonTextarea
                                                            className='bodyInput'
                                                            placeholder="Begin your day here..."
                                                            value={editBody.body}
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

                                            {
                                                // getJournalImg()

                                                // journalImg != '' ? <IonImg src={journalImg}/> : <span></span>
                                                photos ?
                                                    <IonImg src={photos.webviewPath ? photos.webviewPath : ''} onClick={() => setPhotoToDelete(photos)} /> :
                                                    editBody.url ? <IonImg src={editBody ? editBody.url : ''} /> : <span></span>
                                            }
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
                                        {mode == 'edit' ? <IonButton onClick={() => deleteCurrJournal()} color="danger"> DELETE JOURNAL </IonButton> : <span></span>}
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
                        :

                        <div className="loader-container">
                            <div className="lds-dual-ring"></div>
                        </div>


                }

                <div className="spacer"></div>
                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            if (photoToDelete) {
                                deletePhoto(photoToDelete);
                                setPhotoToDelete(undefined);
                            }
                        }
                    }, {
                        text: 'Cancel',
                        icon: close,
                        role: 'cancel'
                    }]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />
            </IonContent>
        </IonPage>
    );
};

export default JournalTextEdit;