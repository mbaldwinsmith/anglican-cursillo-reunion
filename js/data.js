// Group Reunion Card - content model derived from REUNIONCARD.md
//
// Each section is a flat, ordered list of "blocks" so render.js can walk
// them generically. Block shapes:
//   { type: 'scripture',  text, ref }
//   { type: 'paragraph',  text }
//   { type: 'versicles',  lines: [string, string] }
//   { type: 'lordsPrayer', traditional, contemporary }
//   { type: 'heading',    text }
//   { type: 'prompt',     id, text }   -- discussion question
//   { type: 'table',      rows: [[string, string], ...] }
//   { type: 'list',       items: [string, ...] }

export const sections = [
  {
    id: 'opening',
    navLabel: 'Opening',
    title: 'Opening',
    blocks: [
      {
        type: 'scripture',
        text: 'Let us consider how to provoke one another to love and good deeds, not neglecting to meet together, as is the habit of some, but encouraging one another.',
        ref: 'Hebrews 10:24–25'
      },
      { type: 'paragraph', text: 'Start by deciding who is to lead on this occasion.' },
      {
        type: 'paragraph',
        text: 'Come, Holy Spirit, fill the hearts of your faithful, and kindle in us the fire of your love.'
      },
      {
        type: 'versicles',
        lines: [
          'Send forth your Spirit and we shall be created.',
          'And you shall renew the face of the earth.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Almighty God, who taught the hearts of your faithful people by sending them the light of your Holy Spirit: grant us by the same Spirit to have a right judgement in all things and evermore to rejoice in his holy comfort; through Jesus Christ our Lord. Amen.'
      },
      {
        type: 'lordsPrayer',
        traditional:
          'Our Father, who art in heaven, hallowed be thy Name; thy kingdom come; thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. For thine is the kingdom, the power, and the glory, for ever and ever. Amen.',
        contemporary:
          'Our Father in heaven, hallowed be your Name, your kingdom come, your will be done, on earth as in heaven. Give us today our daily bread. Forgive us our sins as we forgive those who sin against us. Lead us not into temptation, but deliver us from evil. For the kingdom, the power, and the glory are yours, now and for ever. Amen.'
      },
      {
        type: 'paragraph',
        text: 'We share, review, plan, and ask the support of the group for our life in Christ. The person leading takes one section at a time, reading out the appropriate words. Each person present is then invited to respond to that section.'
      }
    ]
  },
  {
    id: 'piety',
    navLabel: 'Piety',
    title: 'Piety',
    blocks: [
      {
        type: 'scripture',
        text: 'Those who abide in me and I in them bear much fruit, because apart from me you can do nothing.',
        ref: 'John 15:5'
      },
      { type: 'heading', text: 'Prayer and Worship' },
      {
        type: 'prompt',
        id: 'piety-prayer-worship',
        text: 'Share one thing you feel has nourished your union with Christ since we last met. For example:'
      },
      {
        type: 'table',
        rows: [
          ['Eucharist', 'Prayer'],
          ['Other corporate worship', 'Daily Office'],
          ['Meditation/Reflection', 'Reconciliation'],
          ['Retreat/Quiet Day', 'Spiritual Direction']
        ]
      },
      {
        type: 'prompt',
        id: 'piety-close-moment',
        text: 'Share one moment since we last met when you felt close to Christ.'
      }
    ]
  },
  {
    id: 'study',
    navLabel: 'Study',
    title: 'Study',
    blocks: [
      {
        type: 'scripture',
        text: 'Let God transform you inwardly by a complete change of your mind. Then you will be able to know the will of God — what is good and is pleasing to him and is perfect.',
        ref: 'Romans 12:2'
      },
      { type: 'heading', text: 'Christian Formation' },
      {
        type: 'prompt',
        id: 'study-formation',
        text: 'Share something you have learnt from what you have read or experienced since we last met which has deepened your understanding of God’s ways or of your Christian calling. For example, through:'
      },
      {
        type: 'table',
        rows: [
          ['Bible reading', 'Art, music or nature'],
          ['A book', 'Group Study'],
          ['A sermon', 'A course or lecture'],
          ['A play, film or video', 'A conversation']
        ]
      },
      { type: 'heading', text: 'Study of Environments' },
      {
        type: 'prompt',
        id: 'study-environments',
        text: 'How are you trying to gain more understanding of one of the groups of people amongst whom you live your daily life, so as to be more effective in influencing them with gospel values?'
      }
    ]
  },
  {
    id: 'apostolic-action',
    navLabel: 'Apostolic Action',
    title: 'Apostolic Action',
    blocks: [
      {
        type: 'scripture',
        text: 'As the Father has sent me, so I send you.',
        ref: 'John 20:21'
      },
      { type: 'heading', text: 'Transforming the World for Christ' },
      {
        type: 'prompt',
        id: 'apostolic-transforming',
        text: 'What steps have you taken since we last met in order to transform one of the environments of your daily life to make it more like Christ would have it be? Does it seem like a success? Or a disappointment? For example:'
      },
      {
        type: 'list',
        items: [
          'In home or family life',
          'In your workplace amongst friends or neighbours',
          'In the wider community'
        ]
      },
      { type: 'heading', text: 'Making Disciples' },
      {
        type: 'prompt',
        id: 'apostolic-disciples',
        text: 'How have you planned for or taken an opportunity to bring someone to know Christ, or to know him better?'
      },
      {
        type: 'prompt',
        id: 'apostolic-reviewing',
        text: 'Reviewing your plans – have you carried out the plans you made at our last meeting?'
      },
      { type: 'heading', text: 'Planning Your Apostolic Action' },
      {
        type: 'prompt',
        id: 'apostolic-planning',
        text: 'What are the next steps for you to take in your apostolic action?'
      },
      { type: 'heading', text: 'Working Together' },
      {
        type: 'prompt',
        id: 'apostolic-working-together',
        text: 'Is there something we can plan to work on together and with others?'
      }
    ]
  },
  {
    id: 'closing',
    navLabel: 'Closing',
    title: 'Closing',
    blocks: [
      {
        type: 'scripture',
        text: 'Whatever you do, in word, or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.',
        ref: 'Colossians 3:17'
      },
      { type: 'paragraph', text: 'Prayer is offered for:' },
      {
        type: 'list',
        items: ['One another', 'Any who are absent', 'Those who need our prayers']
      },
      {
        type: 'paragraph',
        text: 'We give you thanks, Almighty God, for all the benefits you have given us: you who live and reign for ever and ever. Amen.'
      }
    ]
  }
];
