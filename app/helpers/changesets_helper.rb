module ChangesetsHelper
  def changeset_link(changeset)
    return '' if ENV['CHANGESET_URL'].nil? || ENV['ISSUE_TRACKER'].nil?

    "<a href=\"#{ENV['CHANGESET_URL'].sub(/__VALUE__/, changeset.revision.to_s)}\" target=\"_blank\">[#{ENV['ISSUE_TRACKER']}]</a>".html_safe
  end
  
  def ticket_link(changeset)
    return '' if ENV['TICKET_URL'].nil? || ENV['ISSUE_TRACKER'].nil?

    "<a href=\"#{ENV['TICKET_URL'].sub(/__VALUE__/, changeset.ticket.to_s)}\" target=\"_blank\">[#{ENV['ISSUE_TRACKER']}]</a>".html_safe
  end
end
