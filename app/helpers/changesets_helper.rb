module ChangesetsHelper
  def changeset_link(changeset)
    APP_CONFIG['changeset_url'].sub(/__CHANGESET__/, changeset)
  end
  
  def ticket_link(ticket)
    APP_CONFIG['ticket_url'].sub(/__TICKET__/, ticket)
  end
end
