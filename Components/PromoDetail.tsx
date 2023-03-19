import styles from "@/styles/PromoDetail.module.css";

export default function PromoDetail() {
  return (
    <div className={styles.promoDetailContainer}>
        <div className={styles.promoDetailBox}>
                <div>
                      Pomos:
                      <span className={styles.promoNum}>0</span>
                      <span className={styles.promoNumOf}>/</span>
                      <span className={styles.promoTotalNum}>2</span>
                </div>
                <div>
                        Finish At: 
                        <span className={styles.promoNum}>16:49</span>(0.9h)
                </div>
        </div>

    </div>
  );
}
