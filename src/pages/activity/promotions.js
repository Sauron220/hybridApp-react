import React, { Component } from 'react';
import activity1 from 'assets/img/h1.png';
import activity2 from 'assets/img/h2.png';
import activity3 from 'assets/img/h3.png';
import styles from 'assets/scss/activity/promotions.scss';

const activityList = [
  {
    title: 'Invitation',
    activityImg: activity1,
    activityCon: 'Invite your friends to use our app when the activity is enabled, and GET THE BONUS! Once your friend gets approved or initiates the consumption installment , you will GET EXTRA BONUS respectively!'
  },
  {
    title: 'Suggestions',
    activityImg: activity2,
    activityCon: 'Give us your suggestions. We will offer bonuses and benefits to users who provide valuable suggestions.'
  },
  {
    title: 'Encourage Us',
    activityImg: activity3,
    activityCon: 'Encourage us at the Google Play/App Store. You will get gifts by showing the rating/review record to our sales when the offline shopping is enabled.'
  }
];

class Promotions extends Component {
  render () {
    return(
      <div className={styles.upcomingPromotions}>
        {
          activityList.map((item, key)=>(
           <div key={key} className={styles.listCon}>
              <h5>{item.title}</h5>
             <img src={item.activityImg} alt=""/>
             <p>{item.activityCon}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Promotions;
