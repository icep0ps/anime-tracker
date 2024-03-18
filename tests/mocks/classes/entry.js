class Entry {
  constructor(userid, entryid, status) {
    this.user_id = userid;
    this.entry_id = entryid;
    this.status = status;

    this.title = '';
    this.rating = 0;
    this.progress = 0;
    this.num_episodes = 0;
    this.main_picture = { medium: '' };
  }
}

export default Entry;
