import {useAppDispatch} from "../../../../../../../root";
import {Button, Card, Icon, Image} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {
    updateOffer
} from "../../../../../../../store/offer";
import profile from '../../../../../../../files/profile.jpg'
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../../../../store/auth";
import classes from './OfferItem.module.css';
import {useTranslation} from "react-i18next";

const OfferItem = ({offer, isUserTasks}) => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [offerAccepted, setOfferAccepted] = useState(false);
    const [offerRejected, setOfferRejected] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);

    useEffect(() => {

        },
        [offerAccepted, offerRejected, taskCompleted]);


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
        console.log(taskCompleted)
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

            {(offerAccepted || offerRejected) &&
                <div className={classes.offerInfo__card}>
                    {offerAccepted &&
                    <p>  {t("offerAccepted")}</p>}
                    {offerRejected &&
                        <p>  {t("offerRejected")}</p>}
                </div>
            }
        </section>
    );
};

export default OfferItem;