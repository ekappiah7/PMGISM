const items = [
  'Theology', 'Bible Studies', 'Pastoral Care', 'Evangelism',
  'Christian Leadership', 'Missiology', 'Chaplaincy', 'Youth Ministry',
  'Worship & Counselling', 'Church History', 'Christian Business', 'Homiletics',
]

// Duplicate for seamless loop
const allItems = [...items, ...items]

export default function MarqueeStrip() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i}>✝ {item}</span>
        ))}
      </div>
    </div>
  )
}
