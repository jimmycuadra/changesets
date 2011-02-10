require 'spec_helper'

describe ChangesetsHelper do
  before(:each) do
    @changeset = Factory(:changeset)
  end

  describe "#changeset_link" do
    it "returns an empty string if either of the environment variables are not set" do
      helper.changeset_link(@changeset).should == ''
    end

    it "returns an HTML link to the changeset in the issue tracking system" do
      ENV['CHANGESET_URL'] = 'http://example.com/changeset/__VALUE__'
      ENV['ISSUE_TRACKER'] = 'Tracker'
      helper.changeset_link(@changeset).should == '<a href="http://example.com/changeset/' + @changeset.revision.to_s + '" target="_blank">[Tracker]</a>'
    end
  end

  describe "#ticket_link" do
    it "returns an empty string if either of the environment variables are not set" do
      helper.ticket_link(@changeset).should == ''
    end

    it "returns an HTML link to the ticket in the issue tracking system" do
      ENV['TICKET_URL'] = 'http://example.com/ticket/__VALUE__'
      ENV['ISSUE_TRACKER'] = 'Tracker'
      helper.ticket_link(@changeset).should == '<a href="http://example.com/ticket/' + @changeset.ticket.to_s + '" target="_blank">[Tracker]</a>'
    end
  end
end
