import {useAppDispatch} from "../../../../../../root";
import {Button, Card, Divider, Form, Grid, Header, Icon, Image, Rating, TextArea} from "semantic-ui-react";
import React, {useEffect, useRef, useState} from "react";
import {
    updateOffer
} from "../../../../../../store/offer";
import profile from '../../../../../../files/profile.jpg'
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../../../store/auth";
import classes from './OfferItem.module.css';
import {useTranslation} from "react-i18next";
import {createOpinion, getOpinion, getOpinionForOffer} from "../../../../../../store/opinion";
import UserDetails from "../UserDetails/UserDetails";

const OfferItem = ({offer, isUserTasks}) => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [offerAccepted, setOfferAccepted] = useState(false);
    const [offerRejected, setOfferRejected] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [opinionSent, setOpinionSent] = useState(false);
    const [rating, setRating] = useState();
    const contentInput = useRef();
    const opinion = useSelector(getOpinionForOffer);

    const [modalShowUser, setModalShowUser] = useState(false);

    useEffect(() => {
            if (token && offer.hasOpinion) {
                dispatch(getOpinion({token, offerId: offer.id}))
            }
        },
        [offerAccepted, offerRejected, taskCompleted, offer, modalShowUser, opinionSent, offer.hasOpinion]);


    const acceptOffer = () => {
        if (token) {
            dispatch(updateOffer({token, offerId: offer.id, offerStatus: 'ACCEPTED'}));
        }
        setOfferAccepted(true);
        //todo
    }

    const rejectOffer = () => {
        if (token) {
            dispatch(updateOffer({token, offerId: offer.id, offerStatus: 'REJECTED'}));
        }
        setOfferRejected(true);
    }

    const completeTaskHandler = () => {
        if (token) {
            dispatch(updateOffer({token, offerId: offer.id, offerStatus: 'COMPLETED'}));
        }
        setTaskCompleted(true);
    }

    const handleRate = (e, {rating}) => {
        setRating(rating);
    }

    const createOpinionHandler = () => {
        const ratingContent = contentInput.current.value;
        if (token) {
            dispatch(createOpinion({token, offerId: offer.id, rating, content: ratingContent}));
        }
        setOpinionSent(true);
    }

    const showUser = () => {
        setModalShowUser(true);
    }

    return (
        <section>
            <UserDetails open={modalShowUser} setOpen={setModalShowUser} email={offer.user.email}/>

            {isUserTasks && offer.status === 'ACTIVE' &&
                <Card fluid>
                    <Card.Content>
                        {offer.user.image != null
                            ? <Image src={offer.user.image} rounded size='tiny' floated='right'/>
                            //todo get image
                            :
                            <Image src={profile} rounded size='tiny' floated='right'/>
                        }

                        <Card.Header>{t("offerFrom")}</Card.Header>
                        <Card.Content>{offer.user.name}</Card.Content>
                        <Card.Content><Icon name='home'/>{offer.user.location}</Card.Content>
                        <Card.Content><Icon name='phone'/>{offer.user.phoneNumber}</Card.Content>
                        <Card.Content><Icon name='mail'/>{offer.user.email}</Card.Content>
                        <Button animated onClick={showUser}>
                            <Button.Content visible>{offer.user.email}</Button.Content>
                            <Button.Content hidden>
                                {t("seeDetails")}
                            </Button.Content>
                        </Button>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={acceptOffer}>
                                {t("accept")}
                            </Button>
                            <Button basic color='red' onClick={rejectOffer}>
                                {t("reject")}
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            }

            {isUserTasks && offer.status === 'ACCEPTED' &&
                <Card fluid>
                    <Card.Content>
                        {offer.user.image != null
                            ? <Image src={offer.user.image} rounded size='tiny' floated='right'/>
                            //todo get image
                            :
                            <Image src={profile} rounded size='tiny' floated='right'/>
                        }
                        <Card.Header>{t("jobIsPerformedBy")}</Card.Header>
                        <Card.Content>{offer.user.name}</Card.Content>
                        <Card.Content><Icon name='home'/>{offer.user.location}</Card.Content>
                        <Card.Content><Icon name='phone'/>{offer.user.phoneNumber}</Card.Content>
                        <Card.Content><Icon name='mail'/>{offer.user.email}</Card.Content>
                        <Button animated onClick={completeTaskHandler}>
                            <Button.Content visible>{t("markTheJobComplete")}</Button.Content>
                            <Button.Content hidden>
                                <Icon size='large' name='calendar outline'/>
                            </Button.Content>
                        </Button>
                        {taskCompleted &&
                            <div className={classes.offerInfo__card}>
                                {t("jobCompleted")}
                            </div>}
                    </Card.Content>
                </Card>
            }
            {isUserTasks && offer.status === 'COMPLETED' && !offer.hasOpinion && !opinionSent &&
                <Card fluid>
                    <Card.Content>
                        {offer.user.image != null
                            ? <Image src={offer.user.image} rounded size='tiny' floated='right'/>
                            //todo get image
                            :
                            <Image src={profile} rounded size='tiny' floated='right'/>
                        }
                        <Card.Header>{t("taskCompletedBy")}</Card.Header>
                        <Card.Content>{offer.user.name}</Card.Content>
                        <Card.Content><Icon name='home'/>{offer.user.location}</Card.Content>
                        <Card.Content><Icon name='phone'/>{offer.user.phoneNumber}</Card.Content>
                        <Card.Content><Icon name='mail'/>{offer.user.email}</Card.Content>
                        <Divider/>
                        {!offer.hasOpinion &&
                            <Form onSubmit={createOpinionHandler}>
                                <Header as='h4'>{t("sendOpinion")}</Header>
                                <Form.Field>
                                    <Rating maxRating={5} icon='star' size='huge' onRate={handleRate}/>
                                </Form.Field>
                                <Form.Field>
                                <textarea ref={contentInput} minLength="5" maxLength="800"
                                          placeholder={t("writeYourOpinion")}/>
                                </Form.Field>
                                <Button type='submit'>{t("submit")}</Button>
                            </Form>
                        }
                        {opinionSent &&
                            <div className={classes.offerInfo__card}>
                                {t("opinionSent")}
                            </div>
                        }
                    </Card.Content>
                </Card>
            }

            {(offerAccepted || offerRejected) &&
                <div className={classes.offerInfo__card}>
                    {offerAccepted &&
                        <p>{t("offerAccepted")}</p>}
                    {offerRejected &&
                        <p>{t("offerRejected")}</p>}
                </div>
            }

            {offer.hasOpinion && opinion && (
                <Card>
                    <Card.Content>
                        <Card.Header>{t("feedbackFor")}</Card.Header>
                        <Grid>
                            <Grid.Column>
                                <div>
                                    <Button animated onClick={showUser}>
                                        <Button.Content visible>{offer.user.email}</Button.Content>
                                        <Button.Content hidden>
                                            {t("seeDetails")}
                                        </Button.Content>
                                    </Button>
                                </div>
                                <Divider/>
                                {opinion.rating &&
                                    <Rating maxRating={5} defaultRating={opinion.rating} icon='star' size='large'
                                            disabled/>
                                }
                                {opinion.content &&
                                    <div>{opinion.content}</div>
                                }
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
            )}
        </section>
    );
};

export default OfferItem;