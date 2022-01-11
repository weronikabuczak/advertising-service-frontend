import {useAppDispatch} from "../../../../../../../root";
import {Button, Card, Divider, Form, Header, Icon, Image, Rating, TextArea} from "semantic-ui-react";
import React, {useEffect, useRef, useState} from "react";
import {
    updateOffer
} from "../../../../../../../store/offer";
import profile from '../../../../../../../files/profile.jpg'
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../../../../store/auth";
import classes from './OfferItem.module.css';
import {useTranslation} from "react-i18next";
import {createOpinion} from "../../../../../../../store/opinion";

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


    useEffect(() => {
            console.log(offer.hasOpinion)
            console.log(isUserTasks)
            console.log(opinionSent)
        },
        [offerAccepted, offerRejected, taskCompleted, opinionSent]);


    const acceptOffer = (event) => {
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
        console.log(rating);
        console.log(contentInput.current.value);
        const ratingContent = contentInput.current.value;
        if (token) {
            dispatch(createOpinion({token, offerId: offer.id, rating, content: ratingContent}));
        }
        setOpinionSent(true);
    }


    return (
        <section>
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
                        <Form onSubmit={createOpinionHandler}>
                            <Header as='h4'>Prześlij opinię:</Header>
                            <Form.Field>
                                <Rating maxRating={5} icon='star' size='huge' onRate={handleRate}/>
                            </Form.Field>
                            <Form.Field>
                                <textarea ref={contentInput} minLength="7" maxLength="800"
                                          placeholder="dfsdfsdf"/>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                        {opinionSent &&
                            <div className={classes.offerInfo__card}>
                                opinion sent
                            </div>}

                    </Card.Content>
                </Card>
            }

            {(offerAccepted || offerRejected) &&
                <div className={classes.offerInfo__card}>
                    {offerAccepted &&
                        <p>  {t("offerAccepted")}</p>}
                    {offerRejected &&
                        <p>  {t("offerRejected")}</p>}
                </div>
            }

            {offer.hasOpinion && (
                <div>Opinia</div>
            )}
        </section>
    );
};

export default OfferItem;