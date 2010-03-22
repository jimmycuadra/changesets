class Changeset < ActiveRecord::Base
  validates_numericality_of :revision, :only_integer => true, :greater_than => 0
  validates_numericality_of :ticket, :allow_nil => true, :only_integer => true, :greater_than => 0
  validates_presence_of :revision
  validates_uniqueness_of :revision
  validates_inclusion_of :merged, :in => [true, false]
  
  named_scope :unmerged, :conditions => { :merged => false }
end
